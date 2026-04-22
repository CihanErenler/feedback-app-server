import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
