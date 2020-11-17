import hasPermissions from '../permissions';
import UserRepository from '../../repositories/user/UserRepository';
import { Request } from 'express';


const jwt = require('jsonwebtoken');

export default (moduleName:string, permissionType:string) =>async (req , res, next) => {
    
    const { headers : { authorization: token }} = req;
    let userDetail;

    if (!token) {
        next({
            message: 'Token not found',
            error: 'Authentication failed',
            status: 403
        });
    }   
    
    try{
        const user = jwt.verify( token, 'qwertyuiopasdfghjklzxcvbnm123456');
        req.userData = user.result;

        if(!userDetail) {
            next({
                error: "Unauthorized",
                message: 'Permission Denied',
                status: 403
                
            });
        }

        if (!hasPermissions(moduleName, user.result.role, permissionType)) {
            next({
                message: 'permission denied',
                error: 'Unauthorized Access',
                status: 403
            });
        }
        next();     
    } 
    catch (err) {
        console.log(err);
        next({
            message: 'User is unauthorized',
            error: 'Unauthorized Access',
            status: 403
        });
    }
    

};
