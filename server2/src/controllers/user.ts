import { Router, Response } from "express";
import { getStatus } from "../utils";
import { getUser } from "../abl";
import { GetUserRequest } from "../types";

export const user = Router();

user.route("").get(async (req: GetUserRequest, res: Response) => {
  const result = await getUser(req.query);
  return res.status(getStatus(result.errorMap)).send(result);
});
