import { Router, Response, Request } from "express";

import { getImage, removeImage, uploadImage } from "../abl";
import { APIError, getStatus } from "../utils";
import { GetImageReqest, RemoveImageRequest } from "../types";
import { getBucket } from "../database";
import { GridFSBucketReadStream } from "mongodb";
import { errorMessages } from "../config";
import mongoose from "mongoose";
import { validationMiddleware } from "../middleware";
import { deleteImagesValidation, getImageValidation } from "../validations";

export const images = Router();

const getImageMW = validationMiddleware("query", getImageValidation);
const deleteImagesMW = validationMiddleware("body", deleteImagesValidation);

images
  .route("")
  .post(async (req: Request, res: Response) => {
    const result = await uploadImage(req, res);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(deleteImagesMW, async (req: RemoveImageRequest, res: Response) => {
    const result = await removeImage(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .get(getImageMW, async (req: Request, res: Response) => {
    const request = req as unknown as GetImageReqest;
    const result = await getImage(request.query);

    if (result.errorMap.length > 0) {
      return res.status(getStatus(result.errorMap)).send(result);
    }

    const bucket = getBucket();
    const stream: GridFSBucketReadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(request.query.id));
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
