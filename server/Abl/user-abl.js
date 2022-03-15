//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const validator = require("validator");
const bcrypt = require("bcrypt");
//SCHEMA//
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const {
  ValidationError,
  DatabaseError,
  APIError,
} = require("../Functions/errorBuilder");

////////////////////////////////////////////////////////////////
class UserAbl {
  async update(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    let updateData = req.body.update;
    const id = req.body.data.userData.userId;
    ///////////////////////////////////////////////////////////
    //FIND USER IN DB//
    let user;
    try {
      user = await UserModel.find({ _id: id });
      if (user.length == 0) {
        new DatabaseError("There is no result of search.", res, response);
      }
      if (user.length > 1) {
        response.data = user;
        new DatabaseError("Call founded more than one user.", res, response);
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Database call failed.", res, response);
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //UPDATE OBJECT IN DB//
    let update;
    if (updateData.hasOwnProperty("password")) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updateData.password, salt);
      updateData.password = hashedPassword;
    }
    try {
      update = await UserModel.updateOne({ _id: id }, updateData);
      if (update.ok) {
        response.data = { updated: true };
      } else {
        response.data = update;
        new DatabaseError("Update of object failed.", res, response);
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
}

module.exports = new UserAbl();
