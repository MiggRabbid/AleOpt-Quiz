import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';

import { type IQuestionModel } from './quiz.types';
import quizService from './quiz.service';
import { UserRoles } from '../user/user.types';
import { RequiredRole } from '../../common/decorators/required-role.decorator';
import AuthGuard from '../../common/guards/auth.guard';
import RoleGuard from '../../common/guards/role.guard';

@Controller('data')
@UseGuards(RoleGuard)
export default class QuizController {
  @Get('questions')
  @UseGuards(AuthGuard)
  async allQuestions(): Promise<IQuestionModel[]> {
    return quizService.getAllQuestions();
  }

  @Post('question')
  @RequiredRole(UserRoles.Admin)
  async newQuestion(@Body() payload: IQuestionModel): Promise<IQuestionModel[]> {
    return quizService.createQuestion(payload);
  }

  @Put('question')
  @RequiredRole(UserRoles.Admin)
  async editQuestion(
    @Query('id') id: string | undefined,
    @Body() payload: IQuestionModel,
  ): Promise<IQuestionModel[]> {
    return quizService.updateQuestion(id, payload);
  }

  @Delete('question')
  @RequiredRole(UserRoles.Admin)
  async deleteQuestion(@Query('id') id: string | undefined): Promise<IQuestionModel[]> {
    return quizService.deleteQuestion(id);
  }
}
