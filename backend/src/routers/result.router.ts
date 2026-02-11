import { Router } from 'express';

import { asyncMiddleware, authMiddleware, roleMiddleware } from '../middleware';
import resultController from '../modules/result/result.controller';
import { UserRoles } from '../modules/user/user.types';

const resultsRouter = Router();
resultsRouter.get(
  '/results',
  roleMiddleware(UserRoles.Admin),
  asyncMiddleware(resultController.allResults.bind(resultController)),
);
resultsRouter.post(
  '/result',
  authMiddleware,
  asyncMiddleware(resultController.addResult.bind(resultController)),
);
resultsRouter.get(
  '/result',
  authMiddleware,
  asyncMiddleware(resultController.userResult.bind(resultController)),
);
resultsRouter.get(
  '/stats',
  authMiddleware,
  asyncMiddleware(resultController.questionStats.bind(resultController)),
);

export default resultsRouter;
