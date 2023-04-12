import mongoose from "mongoose";
import { DB, databases } from "../config";
import Grid from "gridfs-stream";
import dotenv from "dotenv";
import { CoachModel, FilterModel, FitnessModel, UserModel } from "../model";

dotenv.config();

let docDB: undefined | mongoose.Connection = undefined;
let imgDB: undefined | mongoose.Connection = undefined;
let gridfsBucket;
let gfs: Grid.Grid;
export const initDatabase = async () => {
  try {
    mongoose.set("strictQuery", true);
    docDB = await mongoose
      .createConnection(process.env.DB_CONNECTION + "/" + databases.docDatabase.name, {
        keepAlive: true,
        maxPoolSize: 50,
      })
      .asPromise();
    imgDB = await mongoose
      .createConnection(process.env.DB_CONNECTION + "/" + databases.imgDatabase.name, {
        keepAlive: true,
        maxPoolSize: 50,
      })
      .asPromise();
    imgDB.set("useUnifiedTopology", true);
    imgDB.set("useNewUrlParser", true);
    docDB.set("useUnifiedTopology", true);
    docDB.set("useNewUrlParser", true);
    console.log("Connected to URI: " + process.env.DB_CONNECTION + "/" + databases.docDatabase.name);
    console.log("Connected to URI: " + process.env.DB_CONNECTION + "/" + databases.imgDatabase.name);
    gridfsBucket = new mongoose.mongo.GridFSBucket(imgDB.db, { bucketName: databases.imgDatabase.imgBucket });
    gfs = Grid(imgDB.db, mongoose.mongo);
    gfs.collection(databases.imgDatabase.imgBucket);

    //MODELS
    docDB.model(FilterModel.modelName, FilterModel.schema, FilterModel.collection.name);
    docDB.model(CoachModel.modelName, CoachModel.schema, CoachModel.collection.name);
    docDB.model(FitnessModel.modelName, FitnessModel.schema, CoachModel.collection.name);
    docDB.model(UserModel.modelName, UserModel.schema, UserModel.collection.name);
  } catch (error) {
    throw new Error(error.message);
  }

  return [docDB, imgDB];
};

export const getDatabase = async (db: DB): Promise<mongoose.Connection> => {
  if (db == DB.gymtour && docDB === undefined) {
    const init = await initDatabase();
    return init[0];
  }
  if (db == DB.images && imgDB === undefined) {
    const init = await initDatabase();
    return init[1];
  }
  return db === DB.gymtour ? docDB : imgDB;
};

export const getGfs = () => {
  return gfs;
};

export const getBucket = () => {
  return gridfsBucket;
};
