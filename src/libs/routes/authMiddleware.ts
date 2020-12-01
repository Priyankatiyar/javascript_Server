import hasPermissions from '../permissions';
import UserRepository from '../../repositories/user/UserRepository';
import { NextFunction, Request } from 'express';
import IRequest from './IRequest';
import configuration from '../../config/configuration';

const jwt = require('jsonwebtoken');

export default (moduleName:string, permissionType:string) =>async (req: IRequest, res, next) => {
    
    const { headers : { authorization: token }} = req;
    let userDetail;
    const secret = configuration.SECRET_KEY;
    if (!token) {
        next({
            message: 'Token not found',
            error: 'Authentication failed',
            status: 403
        });
    }   
    
    try{
        const user = jwt.verify( token, secret);
        userDetail = await UserRepository.readOne({ email: user.userData.email});
        res.locals.userData = userDetail;
        
        if (!hasPermissions(moduleName, userDetail.role, permissionType)) {
            next({
                message: 'TRy permission denied',
                error: 'Unauthorized Access',
                status: 403
            });
        }
        next();     
    } 
    catch (err) {
        console.log(err);
        next({
            message: 'Catch User is unauthorized',
            error: 'Unauthorized Access',
            status: 403
        });
    }

};
