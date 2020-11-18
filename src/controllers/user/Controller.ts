import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import * as jwt  from 'jsonwebtoken';
import { payload } from '../../libs/constants';

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
            const userRepository = new UserRepository();
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
            const userRepository = new UserRepository();
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
            const userRepository = new UserRepository();
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
        } catch (err) {
            console.log('error is ', err);
        }
    }

    login( req: Request, res: Response, next: NextFunction) {
        try {
            payload.email = req.body.email;
            payload.password = req.body.password;
            UserRepository.readOne({ email: req.body.email, passsword: req.body.passsword })
            .then((data) => {
                if (data === null) {
                    next({
                        message: 'user not found',
                        error: 'Unauthorized Access',
                        status: 403
                    });
                }
                else {
                    const token = jwt.sign(payload, 'qwertyuiopasdfghjklzxcvbnm123456');
                    res.status(200).send({
                        message: 'token created successfully',
                        data: {
                            generated_token: token
                        },
                        status: 'success'
                    });
                }
            })
            .catch((err) => {
                console.log('data not found', err);
            });

        }
        catch (err) {
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }
    }
}

export default UserController.getInstance();
