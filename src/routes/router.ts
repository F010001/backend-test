import { Router } from 'express';
import { authRouter } from './authRouter';
import { fileRouter } from './fileRouter';

export const router = Router({});

router.use('/auth', authRouter);
router.use('/file', fileRouter);
