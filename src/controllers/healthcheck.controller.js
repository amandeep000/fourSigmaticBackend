import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler((req, res) => {
  res.status(200).json(new ApiResponse(200, "ok, healthcheck passed"));
});

export { healthCheck };

// {feature}.{type}.js --> this is industry standard naming convention followed by professionals
