import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
const traineeRouter = Router();
traineeRouter.route('/')
    .get(authMiddleware('getUsers', 'read' ), validationHandler(validation.get), traineeController.get)
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update)
    .delete(validationHandler(validation.delete), traineeController.delete);
    traineeRouter.route('/:id')
    .delete(validationHandler(validation.delete), traineeController.delete);
export default traineeRouter;
