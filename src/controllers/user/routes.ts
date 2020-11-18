import { Router } from 'express';
import userController  from '../../controllers/user/Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import  authMiddleware  from  '../../libs/routes/authMiddleWare';
import { permissions } from '../../libs/permissions';

const userRouter = Router();
userRouter.route('/')
    .get(userController.get)
    .post(userController.create)
    .put( userController.update);
    userRouter.route('/:id')
    .delete(validationHandler(validation.delete), userController.delete);

export default userRouter;
