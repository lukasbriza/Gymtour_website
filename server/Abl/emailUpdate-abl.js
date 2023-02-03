//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const jwt = require("jsonwebtoken");
//FUNCTIONS//
const dateGap = require("../Functions/dateGap");
//SCHEMA//
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const { DatabaseError, ValidationError } = require("../Functions/errorBuilder");

class EmailUpdateAbl {
  async update(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const token = req.body.token;
    let user;

    //UNPACK TOKEN//
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);

    //VERIFY IF KEY EXISTS//
    if (decoded._id === undefined) {
      new ValidationError("Token does not contain user id.", res, response);
      return;
    } else {
      //GET USER OBJECT FROM DB//
      try {
        user = await UserModel.findById(decoded._id);
      } catch (err) {
        if (err instanceof Error) {
          new DatabaseError("Database call failed.", res, response);
          return;
        }
        throw err;
      }
    }
    //VERIFY IF UPDATE WAS ALREADY MADE//
    if (user.email == user.emailUpdate.value) {
      response.data = { approved: true, changeMade: false };
      return response;
    }
    //VERIFY IF TOKEN RUN OUT OF DATE//
    const gap = dateGap(user.emailUpdate.validTo);
    if (gap.expired === true || gap.value >= 0) {
      response.data = { approved: false, changeMade: false };
      return response;
    }
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //MAKE CHANGE IN DATABASE//
    let dbCall;
    try {
      dbCall = await UserModel.updateOne(
        { _id: decoded._id },
        {
          email: user.emailUpdate.value,
          "emailUpdate.validTo": new Date(),
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Database call failed.", res, response);
        return;
      }
      throw err;
    }

    if (dbCall.matchedCount == 0 || dbCall.modifiedCount == 0) {
      ///////////////////////////////////////////////////////////
      //BUILD RESPONSE//
      response.data = { approved: false, changeMade: false };
      return response;
    }
    if (dbCall.matchedCount == 1 && dbCall.modifiedCount == 1) {
      ///////////////////////////////////////////////////////////
      //BUILD RESPONSE//
      response.data = { approved: true, changeMade: true };
      return response;
    } else {
      ///////////////////////////////////////////////////////////
      //BUILD RESPONSE//
      response.data = { approved: false, changeMade: false };
      return response;
    }
  }
}

module.exports = new EmailUpdateAbl();
