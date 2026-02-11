import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';

import type { IAuthenticatedRequest } from '../../common/types/auth.types';
import resultService from './result.service';
import type { IUserAnswer } from './result.types';
import { UserRoles } from '../user/user.types';
import { RequiredRole } from '../../common/decorators/required-role.decorator';
import AuthGuard from '../../common/guards/auth.guard';
import RoleGuard from '../../common/guards/role.guard';

@Controller('data')
@UseGuards(RoleGuard)
export default class ResultController {
  @Get('results')
  @RequiredRole(UserRoles.Admin)
  async allResults() {
    return resultService.getAllResults();
  }

  @Post('result')
  @UseGuards(AuthGuard)
  async addResult(
    @Req() request: IAuthenticatedRequest,
    @Query('username') username: string | undefined,
    @Body() payload: { answers: IUserAnswer[]; data: string },
  ) {
    return resultService.addResult(request.user, username, payload);
  }

  @Get('result')
  @UseGuards(AuthGuard)
  async userResult(
    @Req() request: IAuthenticatedRequest,
    @Query('username') username: string | undefined,
  ) {
    return resultService.getUserResult(request.user, username);
  }

  @Get('stats')
  @UseGuards(AuthGuard)
  async questionStats(@Query('question') questionId: string | undefined) {
    return resultService.getQuestionStats(questionId);
  }
}
