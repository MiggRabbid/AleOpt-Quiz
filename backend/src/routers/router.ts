import { Router } from 'express';
import authRouter from './authRouter';
import userRouter from './userRouter';
import quizRouter from './quizRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/data', userRouter);
router.use('/data', quizRouter);

export default router;

