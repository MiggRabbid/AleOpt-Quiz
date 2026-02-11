import { Module } from '@nestjs/common';

import QuizController from '../modules/quiz/quiz.controller';
import ResultController from '../modules/result/result.controller';
import UserController from '../modules/user/user.controller';

@Module({
  controllers: [UserController, QuizController, ResultController],
})
export default class DataModule {}
