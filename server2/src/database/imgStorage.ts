import { GridFsStorage } from "multer-gridfs-storage";
import { databases } from "../config";
import { randomBytes } from "crypto";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import util from "util";

dotenv.config();

export const imgStorage = new GridFsStorage({
  url: process.env.DB_CONNECTION + "/" + databases.imgDatabase.name,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: databases.imgDatabase.imgBucket,
        };
        resolve(fileInfo);
      });
    });
  },
});

export const uploadFiles = multer({ storage: imgStorage });

export const uploadFilesMiddleware = (arr: { name: string; maxCount?: number }[]) => {
  return util.promisify(uploadFiles.fields(arr));
};
