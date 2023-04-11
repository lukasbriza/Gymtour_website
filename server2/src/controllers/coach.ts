import { Router, Response, Request } from "express";
import { AddCoachRequest, GetCoachRequest, RemoveCoachesRequest, UpdateCoachRequest } from "../types";
import { addCoach, getCoaches, removeCoaches, updateCoach } from "../abl";
import { getStatus } from "../utils";
import { validationMiddleware } from "../middleware";
import { deleteCoachValidation, getCoachValidation, postCoachValidation, putCoachValidation } from "../validations";

export const coach = Router();

const getCoachMW = validationMiddleware("query", getCoachValidation);
const postCoachMW = validationMiddleware("body", postCoachValidation);
const deleteCoachMW = validationMiddleware("body", deleteCoachValidation);
const putCoachMW = validationMiddleware("body", putCoachValidation);

coach
  .route("")
  .get(getCoachMW, async (req: Request, res: Response) => {
    const request = req as unknown as GetCoachRequest;
    const result = await getCoaches(request.query);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .post(postCoachMW, async (req: AddCoachRequest, res: Response) => {
    const result = await addCoach(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .delete(deleteCoachMW, async (req: RemoveCoachesRequest, res: Response) => {
    const result = await removeCoaches(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  })
  .put(putCoachMW, async (req: UpdateCoachRequest, res: Response) => {
    const result = await updateCoach(req.body);
    return res.status(getStatus(result.errorMap)).send(result);
  });
