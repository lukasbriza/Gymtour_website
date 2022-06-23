//DEPENDENCIES//
const { resBuild } = require("../Functions/responseBuilder");
const mongoose = require("mongoose");
const ImagesAbl = require("./images-abl");
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
        return;
      }
      throw err;
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
    let fitness;
    try {
      fitness = new FitnessModel(createData);
      await fitness.save();
      response.data = fitness;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Fitness saving failed.", res, response);
        return;
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
      updateRes = await FitnessModel.updateOne({ _id: inputObj._id }, inputObj);
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
    /////////////////////////////////////////////////////////
    //BUILD RESPONSE//
    return response;
  }
  async get(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //INPUT//
    const URL_PARAMS = JSON.parse(req.query.get);
    const query = URL_PARAMS.query;
    const projection = URL_PARAMS.projection ? URL_PARAMS.projection : null;
    const options = URL_PARAMS.options ? URL_PARAMS.options : null;
    const limit = URL_PARAMS.limit ? URL_PARAMS.limit : 20;
    const order = URL_PARAMS.order ? URL_PARAMS.order : 1;
    /**
     * {$and[
     * {town:{$in:[]}}
     * {region:{$in:[]}}
     * {'filters.specialization':{$all:[]}}
     * {'filters.others':{$all:[]}}
     * {'filters.equipment':{$all:[]}}
     * {'filters.general':{$all:[]}}
     * ]}
     */
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //HOW TO SORT?
    const orderQuerry =
      order === 1
        ? { popularity: "desc" }
        : order === 2
        ? { name: "asc" }
        : { views: "desc" };
    let getRes;

    try {
      getRes = await FitnessModel.find(query, projection, options)
        .sort(orderQuerry)
        .limit(limit)
        .exec();
      response.data = await getRes;
      console.log(response);
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
    const ids = req.body.delete._id;
    ///////////////////////////////////////////////////////////
    //DB CALL//
    //REMOVE PICTURES LINKED TO FITNESS FROM DB//
    req.body.remove = { _id: [] };
    console.log(req.body.remove);
    try {
      for (let i = 0; ids.length > i; i++) {
        const pictureObj = await FitnessModel.findOne(
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
