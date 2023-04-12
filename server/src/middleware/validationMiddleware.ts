import type { NextFunction, Request, Response } from "express";
import { ValidationError as yupError, InferType } from "yup";
import { UnprocesableError, buildResponse } from "../utils";

const UNPROCESABLE_CODE = 422;

export const validationMiddleware =
  (type: "query" | "body", validationFunction: (object) => Promise<InferType<any> | yupError>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const valObject = type === "body" ? req.body : req.query;
    try {
      await validationFunction(valObject);
      next();
    } catch (err) {
      const error = new UnprocesableError(err.message);
      const response = buildResponse();
      response.errorMap.push(error);
      res.status(UNPROCESABLE_CODE).send(response);
    }
  };
