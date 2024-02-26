import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";
import { FRONTEND_URI } from "./config.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URI || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", propertyRouter);

export default app;
