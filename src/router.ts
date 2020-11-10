import { Router } from 'express';
import { traineeRouter } from './controllers/trainee';
import express from 'express';
import { userRouter } from './controllers/user';

const mainRouter = Router();

mainRouter.use('/trainee', traineeRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;
