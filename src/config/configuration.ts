 import * as dotenv from 'dotenv';
const envVars = dotenv.config();
const config = envVars.parsed;
export default config;
console.log ('config is', config);
Object.freeze(config);
