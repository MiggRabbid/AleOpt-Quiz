import { Router } from 'express';

import { resultController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middleware';

import { UserRoles } from '../types';

const resultsRouter = Router();
resultsRouter.get('/results', roleMiddleware(UserRoles.Admin), resultController.allResults);

resultsRouter.get(
  '/questions-stats',
  roleMiddleware(UserRoles.Admin),
  resultController.questionsStats,
);
resultsRouter.post('/result', authMiddleware, resultController.addResult);
resultsRouter.get('/result', authMiddleware, resultController.userResult);
resultsRouter.get('/stats', authMiddleware, resultController.questionStats);

export default resultsRouter;
