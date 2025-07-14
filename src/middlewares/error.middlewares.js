import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!err instanceof ApiError) {
    const statuscode =
      error.statuscode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Something went wrong!";
    error = new ApiError(statuscode, message, error?.errors || [], error.stack);
  }
  const response = {
    ...error,
    message: error.message,
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }
  return res.satus(error.statuscode).json(response);
};
export { errorHandler };
