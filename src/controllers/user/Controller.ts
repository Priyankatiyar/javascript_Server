import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import * as jwt  from 'jsonwebtoken';
import { payload } from '../../libs/constants';
import * as bcrypt from 'bcrypt';
import configuration from '../../config/configuration';


class UserController {
    static instance: UserController;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    public async login( req: Request, res: Response, next: NextFunction) {
        try {
            const secret = configuration.SECRET_KEY;
            const {email, password } = req.body;
            payload.password = password;
            const userData = await UserRepository.readOne({email});
            if (userData === null ) {
                return next({
                    message: 'Email Not Registered! ',
                    error: 'Unauthorized Access',
                    status: 403
                });
            }
            else {
                if (email === userData.email) {
                   const result = bcrypt.compareSync(payload.password, userData.password );
                        if (result) {
                        console.log('Password matched![Authorized User]');
                        const token = jwt.sign({userData}, secret);
                        res.status(200).send({
                            message: 'token created successfully',
                            data: {
                                generated_token: token
                            },
                            status: 'success'
                        });
                    }
                    else {
                        console.log('Password not matched!');
                        res.status(400).send({
                            message: 'Invalid Password!',
                            error: 'Unauthorized Access',
                            status: 403
                        });
                        }
                }
            }
        }
        catch (err) {
            res.send(err);
            return next({
                error: 'bad request',
                message: err,
                status: 400
            });
        }

    }
    me( req: Request, res: Response, next: NextFunction) {
        const data = res.locals.userData;
        console.log('Data::::', data);
        res.json( {
        data
     });
    }

}

export default UserController.getInstance();
