import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import router from './routers';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`BACK / START SERVER - port: ${PORT}`));
  } catch (e) {
    console.error('BACK / start', e);
  }
};

start();
