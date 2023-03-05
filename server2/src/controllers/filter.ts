import { Router, Response } from "express";
import { GetFilterRequest } from "../types";
import { getFilter } from "../abl";

export const filter = Router();

filter.route("").get(async (req: GetFilterRequest, res: Response) => {
  const result = await getFilter();
  return res.status(200).send(result);
});
