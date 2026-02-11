import 'reflect-metadata';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { NestFactory } from '@nestjs/core';

import { connectDB } from './config/db';
import AppModule from './app.module';
import AllExceptionsFilter from './common/filters/all-exceptions.filter';

dotenv.config();

const PORT = process.env.PORT ?? 5000;

async function bootstrap(): Promise<void> {
  try {
    await connectDB();

    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.use(hpp());
    app.use(cors());
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(PORT);
    console.log(`BACK / START SERVER - port: ${PORT}`);
  } catch (error) {
    console.error('BACK / start', error);
    process.exit(1);
  }
}

bootstrap().catch((error: unknown) => {
  console.error('BACK / bootstrap', error);
  process.exit(1);
});
