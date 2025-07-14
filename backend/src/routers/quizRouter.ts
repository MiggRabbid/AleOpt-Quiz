import { Router } from 'express';

import { quizController } from '../controllers/controllers';
import { authMiddleware, roleMiddleware } from '../middleware/middleware';

import { UserRoles } from '../types/userTypes';

const quizRouter = Router();
quizRouter.get('/questions', authMiddleware, quizController.allQuestions);
quizRouter.post('/question', roleMiddleware(UserRoles.Admin), quizController.newQuestion);
quizRouter.put('/question', roleMiddleware(UserRoles.Admin), quizController.editQuestion);
quizRouter.delete('/question', roleMiddleware(UserRoles.Admin), quizController.deleteQuestion);

export default quizRouter;
