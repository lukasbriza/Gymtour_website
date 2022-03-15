//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
//SCHEMA//
const { NotificationModel } = require("../Schemas/notificationSchema");
//ERROR//
const { DatabaseError, ValidationError } = require("../Functions/errorBuilder");

class NotificationAbl {
  async create(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    let id = req.body.create._id;
    let type = req.body.create.type;
    let message = req.body.create.message;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let notification;
    try {
      notification = new NotificationModel({
        _id: new mongoose.Types.ObjectId(),
        object: {
          id: id,
          type: type,
          message: message,
        },
      });
      await notification.save();
      response.data = notification;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Process of creating notification failed, please contact administrator.",
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
    ///////////////////////////////////////////////////////////
    //INPUT//
    let idToDelete = req.body.delete._id;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let deleteRes;
    try {
      deleteRes = await NotificationModel.deleteOne({ _id: idToDelete });
      if (deleteRes.n == 0) {
        response.data = { id: idToDelete, deleted: false };
      }
      if (deleteRes.n == 1) {
        response.data = { id: idToDelete, deleted: true };
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "Process od deleting notification failed, please contact administrator.",
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

module.exports = new NotificationAbl();
