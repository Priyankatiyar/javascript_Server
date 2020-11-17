import { Router } from 'express';
import userController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
import { permissions } from '../../libs/permissions';
import  config  from './validation';

const userRouter = Router();

userRouter.get('/get',
authMiddleware('getUsers', 'all' ),
validationHandler(validation.get),
userController.get);

userRouter.post('/create',
authMiddleware('getUsers', 'all' ),
validationHandler(validation.create),
userController.create);

userRouter.put('/update',
authMiddleware('getUsers', 'all' ),
validationHandler(validation.update),
userController.update);

userRouter.delete('/:id',
authMiddleware('getUsers', 'all' ),
validationHandler(validation.delete),
userController.delete);

userRouter.get('/me',
authMiddleware( 'getUsers', 'read'),
userController.get );

userRouter.post('/login',
validationHandler(config.login),
userController.login);


export default userRouter;
