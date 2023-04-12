import { Response, Request } from "express";
import { errorMessages } from "../config";
import { uploadFields } from "../config/uploadFields";
import { getGFS, uploadFilesMiddleware } from "../database";
import {
  CustomResponse,
  GetImageResponsePromise,
  GetImageType,
  ImageFieldsObject,
  RemoveImageResponsePromise,
  RemoveImageType,
  UploadImageResponsePromise,
} from "../types";
import { APIError, DatabaseError, assignError, buildResponse } from "../utils";
import { removeImg } from "../database/remove";
import { GridFSFile } from "mongodb";

export const getMeta = async (id: string): Promise<CustomResponse<GridFSFile[]>> => {
  const response = buildResponse<GridFSFile[]>();
  const metadata = await getGFS(id, errorMessages.getMeta.databaseError);
  if (metadata instanceof DatabaseError) {
    return assignError<GridFSFile[]>(null, metadata, response);
  }
  response.data = metadata;
  return response;
};

export const uploadImage = async (req: Request, res: Response): UploadImageResponsePromise => {
  const response = buildResponse<ImageFieldsObject>();
  try {
    const upload = uploadFilesMiddleware([...uploadFields]);
    await upload(req, res);
    response.data = req.files as ImageFieldsObject;

    return response;
  } catch (err: unknown) {
    const error = new DatabaseError(errorMessages.uploadImage.databaseError);
    return assignError<ImageFieldsObject>(null, error, response);
  }
};

export const removeImage = async (body: RemoveImageType): RemoveImageResponsePromise => {
  const response = buildResponse<boolean>();
  const removed = await removeImg(body.ids, errorMessages.removeImage.databaseError);

  if (removed instanceof DatabaseError) {
    return assignError<boolean>(false, removed, response);
  }

  if (Array.isArray(removed)) {
    return assignError<boolean>(false, removed, response);
  }

  response.data = removed;
  return response;
};

export const getImage = async (query: GetImageType): GetImageResponsePromise => {
  const response = buildResponse<GridFSFile>();
  const meta = await getMeta(query.id);
  if (meta.errorMap.length > 0) {
    return assignError<GridFSFile>(null, meta.errorMap, response);
  }

  if (meta.data.length === 0) {
    const error = new APIError(errorMessages.getImage.noImage);
    return assignError<GridFSFile>(null, error, response);
  }

  response.data = meta.data[0];
  return response;
};
