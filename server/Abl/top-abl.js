//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
//SCHEMA//
const { CoachModel } = require("../Schemas/coachSchema");
const { FitnessModel } = require("../Schemas/fitnessSchema");
//ERROR//
const { DatabaseError } = require("../Functions/errorBuilder");

class TopAbl {
  async update(req, res) {
    let response = resBuild();
    response.data = {};
    ///////////////////////////////////////////////////////////
    //INPUT//
    let _id = req.body.top._id;
    let type = req.body.top.type;
    let topStatus = req.body.top.topped;
    let toDate = req.body.top.toDate;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let updateRes;
    try {
      if (type == "fitness") {
        updateRes = await FitnessModel.updateOne(
          { _id: _id },
          { topped: { value: topStatus, toDate: toDate } }
        );
      }
      if (type == "coach") {
        updateRes = await CoachModel.updateOne(
          { _id: _id },
          { topped: { value: topStatus, toDate: toDate } }
        );
      }

      if (updateRes.nModified == 1 && updateRes.ok == 1) {
        response.data.id = _id;
        response.data.type = type;
        response.data.updated = true;
      } else {
        response.data.id = _id;
        response.data.type = type;
        response.data.updated = false;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Top update operation failed. Please contact administrator.",
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
}

module.exports = new TopAbl();
