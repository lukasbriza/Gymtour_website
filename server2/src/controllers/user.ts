import { addUser } from "./../abl/user";
import { Router, Response } from "express";
import { getStatus } from "../utils";
import { getUser, removeUser, updateUser } from "../abl";
import {
  AddUserRequest,
  GetUserRequest,
  RemoveUserRequest,
  UpdateUserRequest,
} from "../types";

export const user = Router();

user
  .route("")
  .get(async (req: GetUserRequest, res: Response) => {
    const result = await getUser(req.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(async (req: RemoveUserRequest, res: Response) => {
    const result = await removeUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .put(async (req: UpdateUserRequest, res: Response) => {
    const result = await updateUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(async (req: AddUserRequest, res: Response) => {
    const result = await addUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });
