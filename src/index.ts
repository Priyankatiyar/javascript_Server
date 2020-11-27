import config from './config/configuration';
import Server from './Server';

console.log(' config is ', config);

const server = new Server(config);

server.bootstrap().run();
server.initSwagger();
