import hasPermissions from '../permissions';
const jwt = require('jsonwebtoken');
export default (moduleName:string, permissionType:string) => (req, res, next) => {
    const { headers : { authorization: token }} = req;
    console.log('Header is:', token);
    let decoder;
    try{
        decoder = jwt.verify( token, 'qwertyuiopasdfghjklzxcvbnm123456');
        console.log('User', decoder);
        if (!token) {
            next({
                message: 'Token not found',
                error: 'Authentication failed',
                status: 403
            });
        }        
    } 
    catch (err) {
        next({
            message: 'User is unauthorized',
            error: 'Unauthorized Access',
            status: 403
        });
    }
    console.log(moduleName);
    if (!hasPermissions(moduleName, decoder.role, permissionType)) {
        next({
            message: 'permission denied',
            error: 'Unauthorized Access',
            status: 403
        });
    }
    next();
};
