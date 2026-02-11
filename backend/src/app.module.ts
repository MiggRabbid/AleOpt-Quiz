import { Module } from '@nestjs/common';

import AuthModule from './modules/auth/auth.module';
import DataModule from './data/data.module';

@Module({
  imports: [AuthModule, DataModule],
})
export default class AppModule {}
