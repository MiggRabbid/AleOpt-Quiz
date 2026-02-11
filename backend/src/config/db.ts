import mongoose, { ConnectOptions } from 'mongoose';
import { getRequiredEnv } from './env';

const DB_USERNAME = encodeURIComponent(getRequiredEnv('DB_USERNAME'));
const DB_PASSWORD = encodeURIComponent(getRequiredEnv('DB_PASSWORD'));
const APP_NAME = getRequiredEnv('APP_NAME');
const DB_NAME = getRequiredEnv('DB_NAME');

const DB_SCHEME = getRequiredEnv('DB_URI_SCHEME');
const DB_HOST = getRequiredEnv('DB_URI_HOST');
const DB_OPTIONS = getRequiredEnv('DB_URI_OPTIONS');

const DB_URI = `${DB_SCHEME}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_OPTIONS}${APP_NAME}`;

const clientOptions: ConnectOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  dbName: DB_NAME,
};

const connectDB = async () => {
  await mongoose.connect(DB_URI, clientOptions);
  const database = mongoose.connection.db;
  if (!database) {
    throw new Error('MongoDB database instance is unavailable after connection');
  }

  await database.admin().command({ ping: 1 });
  console.log(`BACK / START SERVER - mongoose connect is ready`);
};

// eslint-disable-next-line import/prefer-default-export
export { connectDB };
