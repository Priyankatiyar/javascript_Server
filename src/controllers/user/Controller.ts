import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import  { userModel } from '../../repositories/user/UserModel';
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

    // login(req: Request, res: Response, next: NextFunction) {

    //     try {
    //     console.log("::::::::::::INSIDE LOG IN::::::::::::");
    //     const { email, password } = req.body;
    //     userModel.findOne({ email: email, deletedAt: null }, (err, result) => {
    //     if (result != null) {
    //     async function hashPassword() {
    //     const hashPwd = await bcrypt.compare(password, result.password);
    //     return hashPwd;
    //     }
    //     hashPassword().then((result1) => {
    //     if (result1) {
        
    //     const payload = { password: result.password, email: result.email, originalId: result.id, role: result.role };
    //     async function signInUser() {
    //     const token = await jwt.sign(payload, configuration.SECRET_KEY, { expiresIn: '1d' });
    //     return token;
    //     }
    //     signInUser().then((genToken) => {
    //     // console.log("token : ", genToken)
    //     if (genToken) {
    //     console.log("You have Logged in successfully...");
    //     console.log(result);
    //     res.send({
    //     status: 200,
    //     message: 'Authorization Token',
    //     data: genToken,
    //     });
    //     }
    //     })
    //     .catch((err) => {
    //     console.log("Error : ", err);
    //     })
    //     }
    //     else {
    //     res.send({
    //     message: 'Password Doesnt Match',
    //     status: 404
    //     });
    //     }
    //     })
    //     .catch((err) => {
    //     console.log("Error : ", err);
    //     })
    //     }
    //     else {
    //     res.send({
    //     message: 'Email is not Registered',
    //     status: 404
    //     });
    //     }
    //     });
    //     }
    //     catch (err) {
    //     res.send(err);
    //     }
    //     }

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
                        res.send({
                            message: 'Authorization Token',
                            data: token,
                            status: 200,
                        });
                    }
                    else {
                        console.log('Password not matched!');
                        res.send({
                            message: 'Invalid Password!',
                            error: 'Unauthorized Access',
                            status: 400,
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
