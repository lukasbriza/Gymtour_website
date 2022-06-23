//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
//SCHEMA//
const { CoachModel } = require("../Schemas/coachSchema");
const { FitnessModel } = require("../Schemas/fitnessSchema");
//ERROR//
const { APIError, DatabaseError } = require("../Functions/errorBuilder");

class ViewsAbl {
  async getViews(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const type = req.body.getViews.type;
    const _id = req.body.getViews._id;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let call;
    try {
      if (type == "coach") {
        call = await CoachModel.findById(_id, "views");
      } else if (type == "fitness") {
        call = await FitnessModel.findById(_id, "views");
      } else {
        new APIError(
          "Something got wrong. It´s API Error at views get route.",
          res,
          response
        );
        return;
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Get views information from database failed.",
          res,
          response
        );
        return;
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    response.data = await call;
    return response;
  }
  async updateByOne(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const type = req.body.updateViews.type;
    const _id = req.body.updateViews._id;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //GET RECORD//
    let record;
    try {
      if (type == "coach") {
        record = await CoachModel.findById(_id, "views");
      }
      if (type == "fitness") {
        record = await FitnessModel.findById(_id, "views");
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Find views information in database failed.",
          res,
          response
        );
        return;
      }
      throw err;
    }
    //UPDATE RECORD//
    let views = record.views + 1;

    let updateCall;
    try {
      if (type == "coach") {
        updateCall = await CoachModel.updateOne({ _id: _id }, { views: views });
      }
      if (type == "fitness") {
        updateCall = await FitnessModel.updateOne(
          { _id: _id },
          { views: views }
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Update views information in database failed.",
          res,
          response
        );
        return;
      }
      throw err;
    }
    ///////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    response.data = updateCall;
    return response;
  }
}

module.exports = new ViewsAbl();
