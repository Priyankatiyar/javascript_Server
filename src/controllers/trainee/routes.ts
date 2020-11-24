import { Router } from 'express';
import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(authMiddleware('getUsers', 'all'), validationHandler(validation.get), traineeController.getAll)
    .post(authMiddleware('getUsers', 'read'), validationHandler(validation.create), traineeController.create)
    .put( authMiddleware('getUsers', 'write'), validationHandler(validation.update), traineeController.update);

    traineeRouter.route('/:id')
    .delete(authMiddleware('getUsers', 'delete'), validationHandler(validation.delete), traineeController.delete);

export default traineeRouter;
