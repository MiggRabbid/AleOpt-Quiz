import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';

import router from './routers/router';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

const DB_USERNAME = process.env.DB_USERNAME as string;
const DB_PASSWORD = process.env.DB_PASSWORD as string;
const APP_NAME = process.env.APP_NAME as string;
const DB_NAME = process.env.DB_NAME as string;

const DB_SCHEME = process.env.DB_URI_SCHEME as string;
const DB_HOST = process.env.DB_URI_HOST as string;
const DB_OPTIONS = process.env.DB_URI_OPTIONS as string;

const DB_URI = `${DB_SCHEME}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_OPTIONS}${APP_NAME}`;

const clientOptions: ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  dbName: DB_NAME,
};

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await mongoose.connect(DB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(`START SERVER - mongoose connect is ready`);

    app.listen(PORT, () => console.log(`START SERVER - port: ${PORT}`));
  } catch (e) {
    console.error('----- start', e);
  }
};

start();
