import  { userMODEL } from '../../repositories/user/UserModel';
import  UserRepository  from '../../repositories/user/UserRepository';

import * as jwt from 'jsonwebtoken';

class UserController {
    static instance: UserController;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    get(req, res, next) {
        try {
            console.log('Inside get() method of User Controller');
            res.send({
                message: 'Users Data fetched sucsesfully!',
                data: [
                    {
                        data: req.user,
                    }
                ]
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }

    create(req, res, next) {
        try {
            console.log('Inside post() method of User Controller');
            res.send({
                message: 'Users created sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }

    update(req, res, next) {
        try {
            console.log('Inside put() method of Users Controller');
            res.send({
                message: 'Users updated sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }

    delete(req, res, next) {
        try {
            console.log('Inside delete() method of User Controller');
            res.send({
                message: 'Users deleted sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        }

        catch (err) {
            console.log('Inside error', err);
        }
    }

    login( req, res, next ) {
        try {
            const { email, password } = req.body;
            userMODEL.findOne ( { email: req.body.email }, (err, result ) => {
                if ( result ) {
                    if ( password === result.password) {
                        const token = jwt.sign( result, 'qwertyuiopasdfghjklzxcvbnm123456');
                        res.send({
                            data: token,
                            message: 'Login Successful!',
                            code: 200
                        });
                    }
                    else {
                            res.send({
                            message: 'Incorrect Password',
                            code: 400
                        });
                    }
                }
                else {
                    res.send({
                        message: 'Email is not Registered',
                        code: 404
                    });
                }

            });
        }
        catch ( err ) {
            res.send(err);
        }
    }

    }


export default UserController.getInstance();
