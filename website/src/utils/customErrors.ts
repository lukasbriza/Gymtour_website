export type ErrorMapType = CustomError[];
export type ErrorTypesArray = (
  | ApiError
  | DatabaseError
  | DatabaseError
  | ValidationError
  | UnhandledError
  | Error
)[];
export type CustomErrorResponseObject = {
  data: null;
  errorMap: ErrorTypesArray;
};

export type CustomError = {
  Error: {
    code: string;
    date: string;
    message: string;
    name: string;
    trace: string;
  };
};

export class ApiError extends Error {
  code: string;
  trace: string;
  date: string;
  constructor(error: CustomError) {
    super();
    this.name = error.Error.name;
    this.code = error.Error.code;
    this.message = error.Error.message;
    this.trace = error.Error.trace;
    this.date = error.Error.date;
  }
}
export class DatabaseError extends Error {
  code: string;
  trace: string;
  date: string;
  constructor(error: CustomError) {
    super();
    this.name = error.Error.name;
    this.code = error.Error.code;
    this.message = error.Error.message;
    this.trace = error.Error.trace;
    this.date = error.Error.date;
  }
}
export class ValidationError extends Error {
  code: string;
  trace: string;
  date: string;
  constructor(error: CustomError) {
    super();
    this.name = error.Error.name;
    this.code = error.Error.code;
    this.message = error.Error.message;
    this.trace = error.Error.trace;
    this.date = error.Error.date;
  }
}

export class UnhandledError extends Error {
  code: string;
  trace: string;
  date: string;
  constructor(error: CustomError) {
    super();
    this.name = error.Error.name;
    this.code = error.Error.code;
    this.message = error.Error.message;
    this.trace = error.Error.trace;
    this.date = error.Error.date;
  }
}

export class NetworkError extends Error {
  code: string;
  date: string;
  trace: string;
  constructor() {
    super();
    this.name = "NetworkError";
    this.code = "500";
    this.date = String(new Date());
    this.message = "Unable to fetch from API.";
    this.trace = "/AxiosHandler.request";
  }
}
