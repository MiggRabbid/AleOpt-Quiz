import { Router, RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

import { quizController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middleware';

import { IQuestionModel, IErrorResponse, UserRoles } from '../types';

type NewQuizHandler = RequestHandler<
  ParamsDictionary, // params
  IQuestionModel[] | IErrorResponse, // res body
  IQuestionModel, // body
  ParsedQs // query
>;

const quizRouter = Router();
quizRouter.get('/questions', authMiddleware, quizController.allQuestions);
quizRouter.post(
  '/question',
  roleMiddleware(UserRoles.Admin),
  quizController.newQuestion as NewQuizHandler,
);
quizRouter.put(
  '/question',
  roleMiddleware(UserRoles.Admin),
  quizController.editQuestion as NewQuizHandler,
);
quizRouter.delete(
  '/question',
  roleMiddleware(UserRoles.Admin),
  quizController.deleteQuestion as NewQuizHandler,
);

export default quizRouter;
