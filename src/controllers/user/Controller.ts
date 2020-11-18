import { Request, Response, NextFunction } from 'express';
import UserRepositories from '../../repositories/user/UserRepository';

class UserController {
    static instance: UserController;
    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepositories();
            const extractedData = await userRepository.findAll(req.body, {}, {});
            res.status(200).send({
                message: 'User fetched successfully',
                data: [extractedData],
                status: 'success',
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    create(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepositories();
            userRepository.userCreate(req.body);
            res.status(200).send({
                message: 'User created successfully',
                data: [req.body],
                status: 'success',
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    update(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepositories();
            userRepository.userUpdate(req.body);
            res.status(200).send({
                message: 'User updated successfully',
                data: [req.body]
            });
        } catch (err) {
            console.log('error is ', err);
        }
    }
    delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepositories();
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
        } catch (err) {
            console.log('error is ', err);
        }
    }
}

export default UserController.getInstance();
