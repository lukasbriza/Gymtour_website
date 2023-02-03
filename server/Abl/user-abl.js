//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const { sendMail } = require("../Functions/sendMail");
const bcrypt = require("bcrypt");
//SCHEMA//
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const { ValidationError, DatabaseError } = require("../Functions/errorBuilder");

////////////////////////////////////////////////////////////////
class UserAbl {
  async update(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const type = req.body.type;
    const _id = req.body._id;
    const updateValue = req.body.value;
    ///////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////
    //FIND USER IN DB//
    let user;
    try {
      user = await UserModel.find({ _id: _id });
      if (user.length == 0) {
        new DatabaseError("There is no result of search.", res, response);
        return;
      }
      if (user.length > 1) {
        let userString;
        user.forEach((value) => {
          userString = userString + value.username + " ";
        });
        new DatabaseError(
          "Call founded more than one user: " + userString,
          res,
          response
        );
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Database call failed.", res, response);
        return;
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //UPDATE OBJECT IN DB//
    let update;
    //USERNAME UPDATE LOGIC//
    if (type === "username") {
      //VERIFY EXISTENCE OF NEW USERNAME//
      try {
        const verify = await UserModel.find({ username: updateValue });
        if (verify.length !== 0) {
          new ValidationError(
            "This username is alreade in use.",
            res,
            response
          );
          return;
        }
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
          return;
        }
        throw err;
      }
      try {
        update = await UserModel.updateOne(
          { _id: _id },
          { username: updateValue }
        );
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
          return;
        }
        throw err;
      }
      //SEND MAIL//
      await sendMail(
        user[0].email,
        "username",
        updateValue,
        undefined,
        res,
        response
      );
    }
    //PASSWORD UPDATE LOGIC//
    if (type === "password") {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateValue, salt);

      try {
        update = await UserModel.updateOne(
          { _id: _id },
          { password: hashedPassword }
        );
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
        }
        throw err;
      }
      //SEND MAIL//
      await sendMail(
        user[0].email,
        "password",
        user[0].username,
        undefined,
        res,
        response
      );
    }
    //EMAIL UPDATE LOGIC//
    if (type === "email") {
      let date = new Date();
      //VERIFY EXISTENCE OF NEW EMAIL//
      try {
        const verify = await UserModel.find({ email: updateValue });

        if (verify.length > 0) {
          new ValidationError("Email adress is already in use.", res, response);
          return;
        }
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
          return;
        }
        throw err;
      }
      try {
        update = await UserModel.updateOne(
          { _id: _id },
          {
            "emailUpdate.value": updateValue,
            "emailUpdate.validTo": date.setDate(date.getDate() + 7),
          }
        );
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
        }
        throw err;
      }

      await sendMail(
        user[0].email,
        "email",
        updateValue,
        _id,
        undefined,
        res,
        response
      );
    }
    ///////////////////////////////////////////////////////////
    //VERIFICATION FOR ALL//
    if (update.modifiedCount == 1 && update.matchedCount == 1) {
      response.data = { updated: true };
    } else {
      response.data = { updated: false };
      new DatabaseError("Update of object failed.", res, response);
      return;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async delete(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const id = req.body.delete.id;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let deleteCall;
    try {
      deleteCall = await UserModel.deleteOne({ _id: id });
      if (deleteCall.ok) {
        response.data = { deleted: true };
      } else {
        response.data = deleteCall;
        new DatabaseError("Delete of object failed.", res, response);
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Database call failed.", res, response);
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async get(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const id = req.query.id;
    //DB CALL//
    let getCall;
    try {
      getCall = await UserModel.findById({ _id: id });
      console.log(getCall);
      if (getCall !== undefined) {
        response.data = {
          agreement: getCall.agreement,
          _id: getCall._id,
          isAdmin: getCall.isAdmin,
          username: getCall.username,
          email: getCall.email,
          fitnessOwned: getCall.fitnessOwned,
          coachOwned: getCall.coachOwned,
        };
      } else {
        new DatabaseError("Finding user failed.", res, response);
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Calling DB failed.", res, response);
        return;
      } else {
        throw err;
      }
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
}

module.exports = new UserAbl();
