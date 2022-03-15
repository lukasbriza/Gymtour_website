//DEPENDENCIES//
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../Config/securityOptions");
const { resBuild } = require("../Functions/responseBuilder");
//SCHEMA//
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const { DatabaseError, APIError } = require("../Functions/errorBuilder");

////////////////////////////////////////////////////////////////
class LoginAbl {
  async register(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const termStatus = req.body.terms;
    const dataProcessingStatus = req.body.dataProcessing;
    ///////////////////////////////////////////////////////////
    //HASH PASSWORD//
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let emailExist = await UserModel.find({ email: email });
    if (emailExist.length > 0) {
      new DatabaseError(
        "Account with that email already exists.",
        res,
        response
      );
      return;
    }
    let usernameExist = await UserModel.find({ username: username });
    if (usernameExist.length > 0) {
      new DatabaseError(
        "Account with that username already exists.",
        res,
        response
      );
      return;
    }
    try {
      const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        password: hashedPassword,
        email: email,
        fitnessOwned: [],
        coachOwned: [],
        isAdmin: false,
        agreement: {
          terms: {
            status: termStatus,
          },
          dataProcessinfForPropagation: {
            status: dataProcessingStatus,
          },
        },
      });
      await user.save();
      response.data = user;
    } catch (err) {
      //DB CALL VALIDATION//
      if (err instanceof Error) {
        new DatabaseError("Saving user failed.", res, response);
      }
      throw err;
    }
    /////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async login(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const username = req.body.username;
    const password = req.body.password;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let userArr;
    try {
      userArr = await UserModel.find({ username: username }, [
        "username",
        "password",
        "isAdmin",
      ]).exec();
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Database call failed.", res, response);
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //AUTHENTICATION VALIDATION//
    if (userArr.length < 1) {
      response.data = { authenticated: false };
    }
    ///////////////////////////////////////////////////////////
    //COMPARING RESULTS//
    let compareResult;
    if (userArr.length == 1) {
      compareResult = await bcrypt.compare(password, userArr[0].password);
      //HANDLE RESULT//
      if (compareResult == true) {
        ///////////////////////////////////////////////////////
        //JWT SIGN//
        const token = jwt.sign(
          {
            username: username,
            isAdmin: userArr[0].isAdmin,
            userId: userArr[0]._id,
          },
          process.env.JWT_SIGN_KEY,
          {
            expiresIn: config.tokenExpiration,
          }
        );
        ///////////////////////////////////////////////////////
        response.data = { authenticated: true, token: token };
      } else if (compareResult == false) {
        response.data = { authenticated: false };
      } else {
        new APIError("Authentication failed.", res, response);
        return;
      }
    } else if (userArr.length > 1) {
      new APIError(
        "Something got wrong, username must be unique.",
        res,
        response
      );
      return;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
}

module.exports = new LoginAbl();
