import { Router, Response } from "express";
import { AddCoachRequest, GetCoachRequest, RemoveCoachesRequest } from "../types";
import { addCoach, getCoaches, removeCoaches } from "../abl";
import { getStatus } from "../utils";

export const coach = Router();

coach
  .route("")
  .get(async (req: GetCoachRequest, res: Response) => {
    const result = await getCoaches(req.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(async (req: AddCoachRequest, res: Response) => {
    const result = await addCoach(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(async (req: RemoveCoachesRequest, res: Response) => {
    const result = await removeCoaches(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });
