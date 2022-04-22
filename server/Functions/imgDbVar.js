const mongoose = require("mongoose");
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
/////////////////////////////////////////////////////////////////
const imgDbConfig = {
  url: process.env.DB_CONNECTION_IMAGES,
  imgBucket: "images",
};
const storage = new GridFsStorage({
  url: imgDbConfig.url,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: imgDbConfig.imgBucket,
        };
        resolve(fileInfo);
      });
    });
  },
});
let uploadFiles = multer({ storage: storage }).single("file");
let uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = {
  imgDbConfig,
  uploadFilesMiddleware,
};
