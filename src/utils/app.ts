import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "../middlewares/errorHandler";
import limiter from "../middlewares/rateLimit";

import healthcheck from "../modules/healthcheck/healthcheck.route";
import user from "../modules/users/user.route";
import auth from "../modules/auth/auth.route";
import store from "../modules/stores/store.route";
import product from "../modules/products/product.route";
import order from "../modules/orders/order.route";

const app: Express = express();

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env.test") });
} else {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
// app.use(limiter);
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "Welcome to Hyperstore API v2" });
});

//Routes
app.use("/api/v1/healthcheck", healthcheck);
app.use("/api/v1/user", user);
app.use("/api/v1/auth", auth);
app.use("/api/v1/store", store);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);

app.use(errorHandler);

export default app;
