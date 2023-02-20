class ValidationError extends Error {
  constructor(message, res, response) {
    super();
    this.response = response;
    this.code = "406";
    this.name = "ValidationError";
    this.message = message;
    this.trace = this.stack;

    return res.status(this.code).send(this.errBuild());
  }

  errBuild() {
    let newResponse = this.response;
    newResponse.errorMap.push({
      Error: {
        code: this.code,
        name: this.name,
        message: this.message,
        trace: this.trace,
        date: this.date,
      },
    });
    return newResponse;
  }
}

class DatabaseError extends Error {
  constructor(message, res, response) {
    super();
    this.response = response;
    this.code = "409";
    this.name = "DatabaseError";
    this.message = message;
    this.trace = this.stack;
    this.date = new Date();

    return res.status(this.code).send(this.errBuild());
  }

  errBuild() {
    let newResponse = this.response;
    newResponse.errorMap.push({
      Error: {
        code: this.code,
        name: this.name,
        message: this.message,
        trace: this.trace,
        date: this.date,
      },
    });
    return newResponse;
  }
}

class APIError extends Error {
  constructor(message, res, response) {
    super();
    this.response = response;
    this.code = "400";
    this.name = "APIError";
    this.message = message;
    this.trace = this.stack;
    this.date = new Date();

    return res.status(this.code).send(this.errBuild());
  }

  errBuild() {
    let newResponse = this.response;
    newResponse.errorMap.push({
      Error: {
        code: this.code,
        name: this.name,
        message: this.message,
        trace: this.trace,
        date: this.date,
      },
    });
    return newResponse;
  }
}

module.exports = { ValidationError, DatabaseError, APIError };
