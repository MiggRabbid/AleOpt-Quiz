import { Router } from 'express';
import authRouter from './auth.router';
import userRouter from './user.router';
import quizRouter from './quiz.router';
import resultsRouter from './result.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/data', userRouter);
router.use('/data', quizRouter);
router.use('/data', resultsRouter);

export default router;
