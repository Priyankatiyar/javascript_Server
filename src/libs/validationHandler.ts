import * as express from 'express';
import * as bodyParser from 'body-parser';
import { body, param, query, checkSchema } from 'express-validator';
import validation from '../controllers/trainee/validation';
const app = express();
const router = express.Router();
export default function(config) {
    // tslint:disable-next-line: only-arrow-functions
    return function(req, res, next) {
        const errors = [];
        console.log('inside config', config);
        console.log(req.query);
        console.log(req.body);
        console.log(req.params);
        const keys = Object.keys(config);
        keys.forEach((key) => {
            const ob = config[key];
            console.log('key is', key);
            const values = ob.in.map((val) => {
                return req[val][key];
            });
            console.log('body is', req[ob.in]);
            if (Object.keys( req[ob.in]).length === 0 ) {
                errors.push({
                    message: 'Please pass value through ${ob.in}',
                    status: 400
                });
            }
            console.log('value is', values);
            if (ob.required) {
                if (isNull(values[0])) {
                    errors.push({
                        message: '${key} is required',
                        status: 404
                    });
                }
            }
            if (ob.string) {
                if ( !( typeof (values[0] === 'string'))) {
                    errors.push({
                        message: '${key} must be a String type ',
                        status: 404
                    });
                }
            }
            if (ob.isObject) {
                if ( !(typeof (values) === 'object')) {
                    errors.push({
                        message: '${key} must be an Object type',
                        status: 404
                    });
                }
            }
            if (ob.regex) {
                const regx = ob.regex;
                if (!regx.test(values[0])) {
                    errors.push({
                        message: '${key} is not valid pattern expression',
                        status: 404
                    });
                }
            }
            if (ob.number) {
                if (isNaN(values[0]) || values[0] === undefined) {
                    errors.push({
                        message: '${key} must be a number',
                        status: 404
                    });
                }
            }
            if (errors.length > 0) {
                res.status(400).send({ errors});
            }
            else {
                next();
            }
        } );
    };
}
function isNull( ob ) {
    const check = (ob === undefined || ob === null);
    return check;
}
