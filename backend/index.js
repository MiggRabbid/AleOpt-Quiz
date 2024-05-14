import express from "express";
import mongoose from "mongoose";

import { authRouter, userRouter, quizRouter } from "./src/routers.js";

// MUP5hjScuWgI78qH

const PORT = process.env.PORT || 5000;
const DB_URL = 'mongodb+srv://miggrabbid:MUP5hjScuWgI78qH@aleopt-quiz.b83cvlz.mongodb.net/?retryWrites=true&w=majority&appName=AleOpt-Quiz';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/data', userRouter);
app.use('/quiz', quizRouter);

const start = async () => {
  try {
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`START SERVER - port: ${PORT}`));
  } catch (e) {
    console.error(e)
  }
};

start();