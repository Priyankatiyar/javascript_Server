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
    public async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const extractedData = await userRepository.findAll({}, {}, {});
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
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.createUser(req.body);
            res.status(200).send({
                message: 'trainee created successfully',
                data: [result],
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            await userRepository.updateUser(req.body);
            res.status(200).send({
                message: 'trainee updated successfully',
                data: [req.body]
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            await userRepository.delete(req.params.id);
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
