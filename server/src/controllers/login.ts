import { Router, Request, Response } from "express";
import { loginUser } from "../abl/login";

export const login = Router();

login.route("").post(async (req: Request, res: Response) => {
  //TODO logic
  await loginUser();
  return res.status(200);
});
