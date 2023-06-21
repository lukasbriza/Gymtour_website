import { Router, Response, Request } from "express";
import { addFitness, addFitnessLike, getFitnesses, removeFitnesses, updateFitness } from "../abl";
import { getStatus } from "../utils";
import {
  AddFitnessLikeRequest,
  AddFitnessRequest,
  GetFitnessRequest,
  RemoveFitnessesRequest,
  UpdateFitnessRequest,
} from "../types";
import { validationMiddleware } from "../middleware";
import {
  deleteFitnessValidation,
  getFitnessValidation,
  postFitnessValidation,
  putFitnessValidation,
} from "../validations";

export const fitness = Router();

const getFitnessrMW = validationMiddleware("query", getFitnessValidation);
const postFitnessMW = validationMiddleware("body", postFitnessValidation);
const deleteFitnessMW = validationMiddleware("body", deleteFitnessValidation);
const putFitnessMW = validationMiddleware("body", putFitnessValidation);

fitness
  .route("")
  .get(getFitnessrMW, async (req: Request, res: Response) => {
    const request = req as unknown as GetFitnessRequest;
    const result = await getFitnesses(request.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(postFitnessMW, async (req: AddFitnessRequest, res: Response) => {
    const result = await addFitness(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(deleteFitnessMW, async (req: RemoveFitnessesRequest, res: Response) => {
    const result = await removeFitnesses(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .put(putFitnessMW, async (req: UpdateFitnessRequest, res: Response) => {
    const result = await updateFitness(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });

//TODO login validation + query validation
fitness.route("/like").get(async (req: Request, res: Response) => {
  const request = req as unknown as AddFitnessLikeRequest;
  const result = await addFitnessLike(request.query);
  return res.status(getStatus(result.errorMap)).send(result);
});
