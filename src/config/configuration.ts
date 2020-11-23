 import * as dotenv from 'dotenv';
 import { IConfig } from './IConfig';

const envVars = dotenv.config();
const config = envVars.parsed;
const SECRET_KEY = process.env.SECRET_KEY;
const Password = process.env.PASSWORD;

export default Object.freeze(config);
