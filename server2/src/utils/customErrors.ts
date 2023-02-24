class ValidationError extends Error {
  constructor(message, res, response) {
    super();
    this.response = response;
    this.code = "406";
    this.name = "ValidationError";
    this.message = message;
    this.trace = this.stack;
  }
}
