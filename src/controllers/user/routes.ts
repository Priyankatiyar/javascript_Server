import { Router } from 'express';
import userController  from '../../controllers/user/Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
import { permissions } from '../../libs/permissions';

const userRouter = Router();

userRouter.route('/login')
    .post(userController.login);
userRouter.route('/me')
    .get(authMiddleware('getUsers', 'read'), userController.me);

export default userRouter;
