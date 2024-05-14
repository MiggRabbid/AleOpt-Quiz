import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";

import { authRouter, userRouter, quizRouter } from "./src/routers.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_PROTOCOL = process.env.DB_PROTOCOL;
const DB_DNS_CLUSTER = process.env.DB_DNS_CLUSTER;
const DB_URL_PARAM = process.env.DB_URL_PARAM;

const DB_URL = `${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_DNS_CLUSTER}/${DB_URL_PARAM}`;

// const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@aleopt-quiz.b83cvlz.mongodb.net/?retryWrites=true&w=majority&appName=AleOpt-Quiz`;

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/data', userRouter);
app.use('/data', quizRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`START SERVER - port: ${PORT}`));
  } catch (e) {
    console.error(e)
  }
};

start();