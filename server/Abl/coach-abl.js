//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
//SCHEMA//
const { CoachModel } = require("../Schemas/coachSchema");
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const { DatabaseError } = require("../Functions/errorBuilder");

class CoachAbl {
  async create(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    let createData = req.body.create;
    createData._id = new mongoose.Types.ObjectId();
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //UNIQUE EMAIL VALIDATION//
    const uniqueEmail = await CoachModel.find(
      {
        "contact.email": createData.contact.email,
      },
      "contact.email"
    );
    if (uniqueEmail.length > 0) {
      new DatabaseError("Coach with this email already exist.", res, response);
      return;
    }
    //UNIQUE NAME VALIDATION//
    const uniqueName = await CoachModel.find(
      {
        name: createData.name,
        region: createData.region,
        town: createData.town,
      },
      "name region town"
    ).exec();

    if (uniqueName.length > 0) {
      new DatabaseError(
        "Coach with this name already exist in this town.",
        res,
        response
      );
      return;
    }
    //VALIDATION OF OWNER EXISTENCE//
    try {
      const ownerRes = await UserModel.find({ _id: createData.owner });
      if (ownerRes.length == 0 || ownerRes.length > 1) {
        throw new Error();
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Validation of owner existence failed. Please contact administrator.",
          res,
          response
        );
      }
    }
    //ADD TO DB//
    let coach;
    try {
      coach = new CoachModel(createData);
      await coach.save();
      response.data = coach;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Coach saving failed.", res, response);
      }
      throw err;
    }
    //ADD ID TO USER ARRAY//
    try {
      const ownerShipResult = await UserModel.updateOne(
        { _id: createData.owner },
        { $push: { coachOwned: { coachId: coach._id } } }
      );
      if (ownerShipResult.nModified == 0) {
        throw new Error();
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Saving to user array wasnt sucessfull. Please contact administrator.",
          res,
          response
        );
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async update(req, res) {
    let response = resBuild();
    response.data = {};
    ///////////////////////////////////////////////////////////
    //INPUT//
    let inputObj = req.body.update;
    let updateRes;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    try {
      updateRes = await CoachModel.updateOne({ _id: inputObj._id }, inputObj);
      if (updateRes.nModified === 1 && updateRes.ok === 1) {
        response.data.id = inputObj._id;
        response.data.updated = true;
      } else {
        response.data.id = inputObj._id;
        response.data.updated = false;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Update operation failed. Please contact administrator.",
          res,
          response
        );
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
    let query = req.body.get.query;
    let projection = req.body.get.projection ? req.body.get.projection : null;
    let options = req.body.get.options ? req.body.get.options : null;
    let limit = req.body.get.limit ? req.body.get.limit : 50;
    console.log(query, projection, options, limit);
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let getRes;
    try {
      getRes = await CoachModel.find(query, projection, options)
        .limit(limit)
        .exec();
      response.data = getRes;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Get operation failed. Please contact administrator.",
          res,
          response
        );
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async delete(req, res) {
    let response = resBuild();
    response.data = [];
    ///////////////////////////////////////////////////////////
    //INPUT//
    const ids = req.body.delete;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //REMOVE FROM USER ARRAY//
    try {
      for (let i = 0; ids.length > i; i++) {
        let getOwner = await CoachModel.find({ _id: ids[i] }, "owner");
        let userId = await getOwner[0].owner;
        let user = await UserModel.find({ _id: userId }, "coachOwned");
        let coachArray = await user[0].coachOwned;
        let newArray = [];
        coachArray.forEach((el) => {
          if (el.coachId != ids[i]) {
            return newArray.push(el);
          }
        });
        await UserModel.updateOne({ _id: userId }, { coachOwned: newArray });
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Remove id from user array failed. Contact administrator.",
          res,
          response
        );
      }
      throw err;
    }
    //REMOVE COACH FROM DB//
    try {
      for (let i = 0; ids.length > i; i++) {
        let data = await CoachModel.deleteOne({ _id: ids[i] });
        if (data.n == 0) {
          response.data.push({ id: ids[i], deleted: false });
        }
        if (data.n == 1) {
          response.data.push({ id: ids[i], deleted: true });
        }
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

module.exports = new CoachAbl();
