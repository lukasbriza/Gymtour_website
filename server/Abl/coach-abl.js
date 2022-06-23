//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
const ImagesAbl = require("./images-abl");
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
    //VALIDATION OF PICTURES ID EXISTENCE//
    let card = createData.pictures.card;
    let main = createData.pictures.detail.main;
    let otherArr = createData.pictures.detail.others;

    const cardResult = await ImagesAbl.getMeta(card, req, res);
    cardResult.data._id
      ? null
      : new DatabaseError(
          "There is no linked picture in card key. You must add picture first. Contact administrator!",
          res,
          response
        );

    const mainResult = await ImagesAbl.getMeta(main, req, res);
    mainResult.data._id
      ? null
      : new DatabaseError(
          "There is no linked picture in main key. You must add picture first. Contact administrator!",
          res,
          response
        );

    if (otherArr.length > 0) {
      await otherArr.forEach(async (id) => {
        let result = await ImagesAbl.getMeta(id, req, res);
        if (result.data._id == undefined) {
          new DatabaseError(
            "There is no linked picture in others Array. You must add picture first. Contact administrator!",
            res,
            response
          );
          return;
        }
      });
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
    //VERIFY UPDATE IMAGES EXISTANCE//
    let picturesObj = inputObj.pictures;
    let card = picturesObj.card;
    let main = picturesObj.detail.main;
    let others = picturesObj.detail.others;

    if (card == main) {
      const cardResult = await ImagesAbl.getMeta(card, req, res);
      cardResult.data._id
        ? null
        : new DatabaseError(
            "There is no linked picture in card key. You have to upload image first!",
            res,
            response
          );

      if (others.length > 0) {
        await others.forEach(async (id) => {
          let result = await ImagesAbl.getMeta(id, req, res);
          result.data._id
            ? null
            : new DatabaseError(
                "There is no linked picture in others key. You have to upload image first!",
                req,
                response
              );
        });
      }
    } else {
      const cardResult = await ImagesAbl.getMeta(card, req, res);
      const mainResult = await ImagesAbl.getMeta(main, req, res);

      if (others.length > 0) {
        await others.forEach(async (id) => {
          let result = await ImagesAbl.getMeta(id, req, res);
          result.data._id
            ? null
            : new DatabaseError(
                "There is no linked picture in others key. You have to upload image first!",
                req,
                response
              );
        });
      }

      cardResult.data._id
        ? null
        : new DatabaseError(
            "There is no linked picture in card key. You have to upload image first!",
            res,
            response
          );
      mainResult.data._id
        ? null
        : new DatabaseError(
            "There is no linked picture in main key. You have to upload image first!",
            res,
            response
          );
    }
    ///////////////////////////////////////////////////////////
    //DB CALL//
    try {
      updateRes = await CoachModel.updateOne({ _id: inputObj._id }, inputObj);
      if (updateRes.modifiedCount == 1 && updateRes.matchedCount == 1) {
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
    const query = req.body.get.query;
    const projection = req.body.get.projection ? req.body.get.projection : null;
    const options = req.body.get.options ? req.body.get.options : null;
    const limit = req.body.get.limit ? req.body.get.limit : 50;
    const order = req.body.get.order ? req.body.get.order : 1;

    console.log(query, projection, options, limit);
    ///////////////////////////////////////////////////////////
    //DB CALL//
    const orderQuerry = order === 1 ? { views: "desc" } : { name: "desc" };
    ///////////////////////////////////////////////////////////
    //DB CALL//
    let getRes;
    try {
      getRes = await CoachModel.find(query, projection, options)
        .sort(orderQuerry)
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
    //REMOVE PICTURES LINKED TO FITNESS FROM DB//
    req.body.remove = { _id: [] };
    console.log(req.body.remove);
    try {
      for (let i = 0; ids.length > i; i++) {
        const pictureObj = await CoachModel.findOne(
          { _id: ids[i] },
          "pictures"
        );
        console.log(pictureObj);

        let removeCall = async (req, res) => {
          return await ImagesAbl.remove(req, res);
        };

        if (pictureObj.pictures.card == pictureObj.pictures.detail.main) {
          //CARD AND MAIN PICTURES ARE SAME//
          req.body.remove._id.push(pictureObj.pictures.card);
          pictureObj.pictures.detail.others.forEach((id) => {
            req.body.remove._id.push(id);
          });
          let result = await removeCall(req, res);
          //VALIDATION//
          if (result.data.filesDeleted == 0) {
            throw new Error("Files deleted: " + result.data.filesDeleted);
          }
        } else {
          //CARD AND MAIN PICTURES ARE NOT SAME//
          req.body.remove._id.push(pictureObj.pictures.card);
          req.body.remove._id.push(pictureObj.pictures.detail.main);
          pictureObj.pictures.detail.others.forEach((id) => {
            req.body.remove._id.push(id);
          });

          let result = await removeCall(req, res);
          //VALIDATION//
          if (result.data.filesDeleted == 0) {
            throw new Error("Files deleted: " + result.data.filesDeleted);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError(
          "File database call threw ERROR. " +
            err.message +
            "... Please contact administrator.",
          res,
          response
        );
        return;
      }
      throw err;
    }
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
