import { Router } from 'express';
import { traineeRouter } from './controllers/trainee';
import express from 'express';
const mainRouter = Router();
mainRouter.use('/trainee', traineeRouter);
export default mainRouter;
