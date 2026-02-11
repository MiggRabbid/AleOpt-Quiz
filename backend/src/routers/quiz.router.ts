import { Router } from 'express';

import { asyncMiddleware, authMiddleware, roleMiddleware } from '../middleware';
import quizController from '../modules/quiz/quiz.controller';
import { UserRoles } from '../modules/user/user.types';

const quizRouter = Router();
quizRouter.get(
  '/questions',
  authMiddleware,
  asyncMiddleware(quizController.allQuestions.bind(quizController)),
);
quizRouter.post(
  '/question',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(quizController.newQuestion.bind(quizController)),
);
quizRouter.put(
  '/question',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(quizController.editQuestion.bind(quizController)),
);
quizRouter.delete(
  '/question',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(quizController.deleteQuestion.bind(quizController)),
);

export default quizRouter;
