import notesRouter from "./routes/notes";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((_req, _res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let statusCode = 500;
  let errorMessage = "An unknown error occurred";
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
