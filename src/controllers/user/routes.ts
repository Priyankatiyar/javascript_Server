import { Router } from 'express';
import userController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
import { permissions } from '../../libs/permissions';
import  config  from './validation';

const userRouter = Router();

userRouter.route('/')
    .get(authMiddleware('getUsers', 'read' ), validationHandler(validation.get), userController.get)
    .post(authMiddleware('getUsers', 'read' ), validationHandler(validation.create), userController.create)
    .put(authMiddleware('getUsers', 'read' ), validationHandler(validation.update), userController.update)
    .delete(authMiddleware('getUsers', 'read' ), validationHandler(validation.delete), userController.delete);

    userRouter.route('/:id')
    .delete(authMiddleware('getUsers', 'read' ), validationHandler(validation.delete), userController.delete);

userRouter.route('/me')
    .get(authMiddleware( 'getUsers', 'all'), userController.get );

userRouter.route('/login')
    .post(validationHandler(config.login), userController.login);


export default userRouter;
