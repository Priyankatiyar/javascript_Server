import { Router } from 'express';
import traineeController from './Controller';
const traineeRouter = Router();
// tslint:disable-next-line: semicolon
traineeRouter.route('/')
    .get(traineeController.get)
    .post(traineeController.create)
    .put(traineeController.update)
    .delete(traineeController.delete);
export default traineeRouter;
