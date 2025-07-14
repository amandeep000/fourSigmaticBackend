import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middlewares.js";
// routes import
import { router as healthCheckRouter } from "./routes/healthcheck.routes.js";
import { router as userRouter } from "./routes/user.routes.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// global routes
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//api routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/users", userRouter);
app.use();
app.use(errorHandler);
export { app };
