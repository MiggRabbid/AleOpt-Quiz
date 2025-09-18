import { Router } from 'express';

import { resultController } from '../controllers/controllers';
import { authMiddleware, roleMiddleware } from '../middleware/middleware';

import { UserRoles } from '../types/userTypes';

const resultsRouter = Router();
resultsRouter.get('/results', roleMiddleware(UserRoles.Admin), resultController.allResults);
resultsRouter.post('/result', authMiddleware, resultController.addResult);
resultsRouter.get('/result', authMiddleware, resultController.userResult);
resultsRouter.get('/stats', authMiddleware, resultController.questionStats);

export default resultsRouter;
