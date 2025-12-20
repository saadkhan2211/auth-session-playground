import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import healthRoute from "./routes/health.route";
import authRoute from "./routes/auth.route";
import { errorHandler } from "./middlewares/error";
import { pool } from "./config/db";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} -> ${req.path}`);
  next();
});

app.use("/", healthRoute);
app.use("/api/auth", authRoute);

app.use(errorHandler);

pool.on("connect", () => {
  console.log("Server is connected to Database");
});

export default app;
