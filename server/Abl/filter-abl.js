//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
//SCHEMA//
const { FilterModel } = require("../Schemas/filterSchema");
//ERROR//
const { DatabaseError } = require("../Functions/errorBuilder");

class FilterAbl {
  async get(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let getRes;
    try {
      getRes = await FilterModel.find().exec();
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
}

module.exports = new FilterAbl();
