// import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
export default (module, permissionType) => (req, res, next) => {
    try {
    const { headers : { authorization: token }} = req;
    // console.log('token == ', token);
    const decoder = jwt.verify( token, 'ZzuPDhFPDFrJW1XtTJ7wY6cybmiheXpn');
    // console.log( 'decoder', decoder);
    next();
    }
    catch (err) {
    console.log('err =========== ', err);
        next( {
            error: 'Unauthorized',
            code: 403
        } );
    }
};
