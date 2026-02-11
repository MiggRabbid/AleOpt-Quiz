import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

import router from './routers';
import { connectDB } from './config/db';
import { errorMiddleware } from './middleware';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(helmet());
app.use(hpp());
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`BACK / START SERVER - port: ${PORT}`);
    });
  } catch (e) {
    console.error('BACK / start', e);
    process.exit(1);
  }
};

start();
