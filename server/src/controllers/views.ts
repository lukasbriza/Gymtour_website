import { Router, Response } from "express";
import { UpdateViewsRequest } from "../types";
import { getStatus } from "../utils";
import { updateViews } from "../abl";

export const views = Router();

views.route("").put(async (req: UpdateViewsRequest, res: Response) => {
  const result = await updateViews(req.body);
  return res.status(getStatus(result.errorMap)).send(result);
});
