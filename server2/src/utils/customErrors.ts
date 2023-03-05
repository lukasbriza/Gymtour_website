export class ValidationError extends Error {
  code: string;
  date: Date;
  constructor(message) {
    super();
    this.code = "406";
    this.name = "ValidationError";
    this.message = message;
    this.date = new Date();
  }
}

export class DatabaseError extends Error {
  code: string;
  date: Date;
  constructor(message) {
    super();
    this.code = "409";
    this.name = "DatabaseError";
    this.message = message;
    this.date = new Date();
  }
}

export class APIError extends Error {
  code: string;
  date: Date;
  constructor(message) {
    super();
    this.code = "400";
    this.name = "APIError";
    this.message = message;
    this.date = new Date();
  }
}
