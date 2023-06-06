import { requiresAuth } from "./middleware/auth";
import notesRouter from "./routes/notes";
import usersRouter from "./routes/users";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

app.use("/api/users", usersRouter);
app.use("/api/notes", requiresAuth, notesRouter);

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
