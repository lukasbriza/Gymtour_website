//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
const config = require("../Config/securityOptions");
const validator = require("validator");
//SCHEMA//
const { FitnessModel } = require("../Schemas/fitnessSchema");
const { UserModel } = require("../Schemas/userSchema");
//ERROR//
const {
  ValidationError,
  DatabaseError,
  APIError,
} = require("../Functions/errorBuilder");

class FitnessAbl {
  async create(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    let createData = req.body.create;
    createData._id = new mongoose.Types.ObjectId();
    ///////////////////////////////////////////////////////////
    //ICO PROCESSING//
    let ico = createData.IN.toString();
    if (ico.length < 8 || ico.length > 8) {
      new ValidationError("IN prop have wrong length.", res, response);
      return;
    }
    let icoArr = ico.split("");
    let pattern = [8, 7, 6, 5, 4, 3, 2, 1];
    let result = 0;
    for (let i = 0; i < icoArr.length; i++) {
      if (i != 7) {
        let multiplication = parseInt(icoArr[i]) * pattern[i];
        result = result + multiplication;
      }
    }
    result = result % 11;
    if (result != 0) {
      new ValidationError("Wrong IN value.", res, response);
      return;
    }
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //UNIQUE NAME VALIDATION//
    const uniqueName = await FitnessModel.find(
      {
        name: createData.name,
        region: createData.region,
        town: createData.town,
      },
      "name region town"
    ).exec();

    if (uniqueName.length > 0) {
      new DatabaseError(
        "Fitness with this name already exist in this town.",
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
    let fitness;
    try {
      fitness = new FitnessModel(createData);
      await fitness.save();
      response.data = fitness;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Fitness saving failed.", res, response);
      }
      throw err;
    }

    //ADD ID TO USER ARRAY//
    try {
      const ownerShipResult = await UserModel.updateOne(
        { _id: createData.owner },
        { $push: { fitnessOwned: { fitnessId: fitness._id } } }
      );
      if (ownerShipResult.nModified == 0) {
        throw new Error();
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Saving to user array wasn´t sucessfull. Please contact administrator.",
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
      updateRes = await FitnessModel.updateOne({ _id: inputObj._id }, inputObj);
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
    /////////////////////////////////////////////////////////
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
    let limit = req.body.get.limit ? req.body.get.limit : 20;
    console.log(query, projection, options, limit);
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let getRes;
    try {
      getRes = await FitnessModel.find(query, projection, options)
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
        let getOwner = await FitnessModel.find({ _id: ids[i] }, "owner");
        let userId = await getOwner[0].owner;
        let user = await UserModel.find({ _id: userId }, "fitnessOwned");
        let fitnessArray = await user[0].fitnessOwned;
        let newArray = [];
        fitnessArray.forEach((el) => {
          if (el.fitnessId != ids[i]) {
            return newArray.push(el);
          }
        });
        await UserModel.updateOne({ _id: userId }, { fitnessOwned: newArray });
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
    //REMOVE FITNESS FROM DB//
    try {
      for (let i = 0; ids.length > i; i++) {
        let data = await FitnessModel.deleteOne({ _id: ids[i] });
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
    /////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
}

module.exports = new FitnessAbl();
