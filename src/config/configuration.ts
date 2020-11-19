 import * as dotenv from 'dotenv';
 import { IConfig } from './IConfig';

const envVars = dotenv.config();
const config = envVars.parsed;
const secret = process.env.secret_key;

export default Object.freeze(config);
