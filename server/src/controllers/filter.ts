import { Router, Response } from "express";
import { GetFilterRequest } from "../types";
import { getFilter } from "../abl";
import { getStatus } from "../utils";

export const filter = Router();

filter.route("").get(async (req: GetFilterRequest, res: Response) => {
  const result = await getFilter();
  return res.status(getStatus(result.errorMap)).send(result);
});
