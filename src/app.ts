import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import routes from "./routes";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
