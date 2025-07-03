class ApiError extends Error {
  constructor(
    statuscode,
    message = "Something went wrong!",
    erorrs = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.data = null;
    this.success = false;
    this.message = message;
    this.erorrs = erorrs;

    if (stack) {
      this.stack = stack;
    } else Error.captureStackTrace(this, this.contructor);
  }
}

export { ApiError };
