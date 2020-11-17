import { Request, Response, NextFunction } from 'express';
import  { userModel } from '../../repositories/user/UserModel';
import  UserRepository  from '../../repositories/user/UserRepository';

import  config  from '../../config/configuration';


import * as jwt from 'jsonwebtoken';

class UserController {

    userRepository: UserRepository = new UserRepository();

    static instance: UserController;

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    }

    get(req, res, next) {
        const user = new UserRepository();
        const { id } = req.query;

        user.getUser({ id })
        .then(( data ) => {
            if ( data === null ) {
                throw new Error('');
            }
            console.log('Inside get() method of User Controller');
            res.status(200).send({
                message: 'Users Data fetched sucsesfully!',
                data,


            });
        })
        .catch (err => {
            console.log(err);
            res.send({
                Error: 'User NOt Found!',
                code: 500,
            });
        });
    }

    create(req, res, next) {

        const { id, name, email, role, password } = req.body;
        const user = new UserRepository();
        const creator = req.userData._id;
        user.create({ id, name, email, role, password}, creator)
        .then( () => {
            console.log('Inside post() method of User Controller');

            res.status(200).send({
                message: 'User Created Successfully!',
                data: {
                    'id': id,
                    'name': name,
                    'email': email,
                    'role': role,
                    'password': password,
                },
                code: 200
            });
        })
        .catch( (err) => {
            next({
                error: 'User not created!',
                code: 404
            });
        });
    }

    update(req, res, next) {
        const { id, dataToUpdate } = req.body;
        const user = new UserRepository();
        const updator = req.userData._id;
        user.updateUser(id, dataToUpdate, updator )
        .then( ( result) => {
            console.log('Inside put() method of Users Controller');
            res.send({
                message: 'Users updated sucsesfully!',
                code: 404
            });
        });
    }

    delete(req, res, next) {
        const id = req.params.id;
        const user = new UserRepository();
        const deletor = req.userData._id;
        user.delete(id, deletor)
        .then( (result) => {
            console.log('Inside delete() method of User Controller');
            res.send({
                message: 'Users deleted sucsesfully!',
                code: 200
            });
        })
        .catch( (err) => {
            next( {
                error: 'User not found to deleted',
                code: 404
            });
        } );
    }

    me(req, res, next) {
        const data = req.body;
        res.json( {
            data
        });
    }

    public async login( req, res, next ) {
        const { email } = req.body;

        console.log('Inside User Controller login');

        const user = new UserRepository();
        const userData =  await user.getUser( { email} );

        if (userData === null) {
            res.status(404).send({
                err: 'User Not Found',
                code: 404
            });
        }
        console.log('userData:', userData);
        const { password } = userData;

        if (password !== req.body.password) {
            res.status(401).send({
                err: 'Invalid Password',
                code: 401
            });
            return;
        }

        const token = jwt.sign(userData.toJSON(), 'qwertyuiopasdfghjklzxcvbnm123456');
        res.send({
            message: 'Login Successfull',
            status: 200,
            'token': token
            });
        return;

    }
}

export default UserController.getInstance();
