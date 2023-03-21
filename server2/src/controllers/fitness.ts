import { Router, Response } from "express";
import { addFitness, getFitnesses, removeFitnesses } from "../abl";
import { getStatus } from "../utils";
import { AddFitnessRequest, GetFitnessRequest, RemoveFitnessesRequest } from "../types";

export const fitness = Router();

fitness
  .route("")
  .get(async (req: GetFitnessRequest, res: Response) => {
    const result = await getFitnesses(req.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(async (req: AddFitnessRequest, res: Response) => {
    const result = await addFitness(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(async (req: RemoveFitnessesRequest, res: Response) => {
    const result = await removeFitnesses(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });
