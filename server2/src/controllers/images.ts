import { Router, Response, Request } from "express";

import { getImage, removeImage, uploadImage } from "../abl";
import { APIError, getStatus } from "../utils";
import { GetImageReqest, RemoveImageRequest } from "../types";
import { getBucket } from "../database";
import { GridFSBucketReadStream } from "mongodb";
import { errorMessages } from "../config";
import mongoose from "mongoose";

export const images = Router();

images
  .route("")
  .post(async (req: Request, res: Response) => {
    const result = await uploadImage(req, res);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(async (req: RemoveImageRequest, res: Response) => {
    const result = await removeImage(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .get(async (req: GetImageReqest, res: Response) => {
    const result = await getImage(req.query);

    if (result.errorMap.length > 0) {
      return res.status(getStatus(result.errorMap)).send(result);
    }

    const bucket = getBucket();
    const stream: GridFSBucketReadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(req.query.id));
    stream.pipe(res);
    stream.on("error", (err) => {
      const error = new APIError(`${errorMessages.getImage.pipeError} ${err.message}`);
      result.errorMap.push(error);
      res.status(400).send(result);
    });
    stream.on("end", () => {
      res.status(200).end();
    });
  });
