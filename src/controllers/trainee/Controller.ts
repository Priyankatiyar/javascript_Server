import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {
    static instance: TraineeController;
    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const extractedData = await userRepository.findAll(req.body, {}, {});
            res.status(200).send({
                message: 'trainee fetched successfully',
                data: [extractedData],
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            userRepository.userCreate(req.body);
            res.status(200).send({
                message: 'trainee created successfully',
                data: [req.body],
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    update(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            userRepository.userUpdate(req.body);
            res.status(200).send({
                message: 'trainee updated successfully',
                data: [req.body]
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            userRepository.delete(req.params.id);
            res.status(200).send({
                message: 'trainee deleted successfully',
                data: [
                    {
                        Id: req.params.id
                    }
                ],
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
}

export default TraineeController.getInstance();
