import { Router, Response } from "express";
import { GetCoachRequest } from "../types";
import { addCoach, getCoaches } from "../abl";
import { getStatus } from "../utils";

export const coach = Router();

coach
  .route("")
  .get(async (req: GetCoachRequest, res: Response) => {
    const result = await getCoaches(req.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(async (req, res) => {
    const result = await addCoach(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });
