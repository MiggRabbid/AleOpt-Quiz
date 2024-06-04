import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";

import { authRouter, userRouter, quizRouter } from "./routers";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_PROTOCOL = process.env.DB_PROTOCOL as string;
const DB_DNS_CLUSTER = process.env.DB_DNS_CLUSTER as string;
const DB_URI_PARAM = process.env.DB_URI_PARAM as string;

const DB_URI = `${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_DNS_CLUSTER}/${DB_URI_PARAM}`;

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/data", userRouter);
app.use("/api/data", quizRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(`START SERVER - mongoose connect is ready`)

    app.listen(PORT, () => console.log(`START SERVER - port: ${PORT}`));
  } catch (e) {
    console.error("----- start", e);
  }
};

start();