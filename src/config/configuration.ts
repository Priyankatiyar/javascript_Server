 import * as dotenv from 'dotenv';
 import { IConfig } from './IConfig';

const envVars = dotenv.config();
const config = envVars.parsed;

export default Object.freeze(config);
