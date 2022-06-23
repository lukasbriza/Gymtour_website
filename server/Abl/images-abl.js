//DEPENDENCIES//
const mongoose = require("mongoose");
const { resBuild } = require("../Functions/responseBuilder");
const { imgDbConfig, uploadFilesMiddleware } = require("../Functions/imgDbVar");
const GridFSBucket = require("mongodb").GridFSBucket;
//ERROR//
const { DatabaseError, APIError } = require("../Functions/errorBuilder");

//MY CONNECTIONS INSTANCES//
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient(imgDbConfig.url);
///////////////////////////////////////////////////////////
class ImagesAbl {
  async upload(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    try {
      await uploadFilesMiddleware(req, res);
      //VALIDATION//
      if (req.file == undefined) {
        new APIError("You have to add file!", res, response);
        return;
      }
      ////////////////////////////////////////////////////////
      //RESPONSE BUILD//
      response.data = req.file.id;
    } catch (err) {
      new DatabaseError("Upload failed!", res, response);
      return;
    }
    ////////////////////////////////////////////////////////
    //REPSONSE//
    return response;
  }

  async get(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    let id = mongoose.mongo.ObjectId(req.query.id);
    console.log(id);
    //TYPE VERIFICATION//
    if (id instanceof Array) {
      new APIError(
        "You can pass only one id. You can´t pass array to this function.",
        res,
        response
      );
    }
    try {
      //CONNECT TO DATABASE//
      await mongoClient.connect();
      //DEFINE MY DB//
      const database = mongoClient.db();
      //GRID FS BUCKET//
      const bucket = new GridFSBucket(database, {
        bucketName: imgDbConfig.imgBucket,
      });
      ///////////////////////////////////////////////////////////
      //DEFINE DOWNLOAD STREAM//
      let downloadStream = bucket.openDownloadStream(id);
      //DATA STREAM HANDLE//
      downloadStream.on("data", (data) => {
        res.write(data);
      });
      downloadStream.on("error", (err) => {
        return new DatabaseError(
          "Cannot download image. Please contact administrator.",
          res,
          response
        );
      });
      downloadStream.on("end", () => {
        console.log("end");
        return res.status(200).end();
      });
      ///////////////////////////////////////////////////////////
    } catch (err) {
      new DatabaseError(
        "Download of image failed: " + err.message,
        res,
        response
      );
      return;
    }
  }
  async getMeta(picId, req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //CONNECT TO DATABASE//
    await mongoClient.connect();
    //DEFINE MY DB//
    const database = mongoClient.db();
    //TARGET COLLECTION - .FILES//
    const imageFilesCollection = database.collection(
      imgDbConfig.imgBucket + ".files"
    );
    let _id = mongoose.mongo.ObjectId(picId);
    try {
      const result = await imageFilesCollection.findOne(_id);
      response.data = result;
    } catch (err) {
      if (err instanceof Error) {
        new DatabaseError("Finding metadata ind DB failed!", res, response);
        return;
      }
      throw err;
    }
    ////////////////////////////////////////////////////////
    //REPSONSE//
    return response;
  }
  async remove(req, res) {
    let response = resBuild();
    ///////////////////////////////////////////////////////////
    //CONNECT TO DATABASE//
    await mongoClient.connect();
    //DEFINE MY DB//
    const database = mongoClient.db();
    //DEFINE MY TARGET COLLECTION - .FILES//
    const imagesFilesCollection = database.collection(
      imgDbConfig.imgBucket + ".files"
    );
    //DEFINE MY TARGET COLLECTION - .CHUNKS//
    const imagesChunksCollection = database.collection(
      imgDbConfig.imgBucket + ".chunks"
    );

    const unblockingCall = await new Promise(async (resolve, reject) => {
      try {
        let idArr = req.body.remove._id.map((_id) => {
          return mongoose.mongo.ObjectId(_id);
        });
        //DB CALL - .FILES//
        const imagesFilesCall = imagesFilesCollection.deleteMany({
          _id: { $in: idArr },
        });
        //DB CALL - .CHUNKS//
        const imagesChunksCall = imagesChunksCollection.deleteMany({
          files_id: { $in: idArr },
        });
        resolve({
          imagesFilesCall: await imagesFilesCall,
          imagesChunksCall: await imagesChunksCall,
        });
      } catch (err) {
        new DatabaseError(
          "Removing of files failed: " + err.message,
          res,
          response
        );
        return;
      }
    });

    //RESULT VERIFICATION - .FILES//
    if (unblockingCall.imagesFilesCall.deletedCount == 0) {
      new DatabaseError(
        "Database didn´t delete any files! Please contact administrator.",
        res,
        response
      );
      return;
    }
    //RESULT VERIFICATION - .CHUNKS//
    else if (unblockingCall.imagesChunksCall.deletedCount == 0) {
      new DatabaseError(
        "Database didn´t delete any chunks! Please contact administrator.",
        res,
        response
      );
      return;
    }
    ////////////////////////////////////////////////////////
    //RESPONSE//

    response.data = {
      filesDeleted: unblockingCall.imagesFilesCall.deletedCount,
      chunksDeleted: unblockingCall.imagesChunksCall.deletedCount,
    };
    return response;
  }
}

module.exports = new ImagesAbl();
