// import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
export default (module, permissionType) => (req, res, next) => {
    try {
    const { headers : { authorization: token }} = req;
    console.log('token == ', token);
    const decoder = jwt.verify( token, 'qwertyuiopasdfghjklzxcvbnm123456');
    console.log( 'decoder', decoder);
    next();
    }
    catch (err) {
        next( {
            error: 'Unauthorized',
            code: 403
        } );
    }
};
