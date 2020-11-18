import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
const traineeRouter = Router();
traineeRouter.route('/')
    .get(traineeController.get)
    .post(traineeController.create)
    .put( traineeController.update);
    traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;
