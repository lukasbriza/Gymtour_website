import { APIError, DatabaseError, ValidationError } from "../utils";

export type ErrorType = ValidationError | DatabaseError | APIError | [];
