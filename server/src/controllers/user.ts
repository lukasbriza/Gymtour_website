import { addUser } from "./../abl/user";
import { Router, Request, Response } from "express";
import { getStatus } from "../utils";
import { getUser, removeUser, updateUser } from "../abl";
import { AddUserRequest, GetUserRequest, RemoveUserRequest, UpdateUserRequest } from "../types";
import { deleteUserValidation, getUserValidation, putUserValidation, postUserValidation } from "../validations";
import { validationMiddleware } from "../middleware";

export const user = Router();

const deleteUserMW = validationMiddleware("body", deleteUserValidation);
const getUserMW = validationMiddleware("query", getUserValidation);
const putUserMW = validationMiddleware("body", putUserValidation);
const postUserMW = validationMiddleware("body", postUserValidation);

user
  .route("")
  .get(getUserMW, async (req: Request, res: Response) => {
    const request = req as unknown as GetUserRequest;
    const result = await getUser(request.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(deleteUserMW, async (req: RemoveUserRequest, res: Response) => {
    const result = await removeUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .put(putUserMW, async (req: UpdateUserRequest, res: Response) => {
    const result = await updateUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(postUserMW, async (req: AddUserRequest, res: Response) => {
    const result = await addUser(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });

user.route("/change").post(async (req: Request, res: Response) => {
  return res.status(200);
});
