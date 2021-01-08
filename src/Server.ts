import * as express from 'express';
import * as bodyparser from 'body-parser';
import notFoundRoute from './libs/routes/notFoundRoute';
import errorHandler from './libs/routes/errorHandler';
import routes from './router';
import Database from './libs/Database';
import * as swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from 'swagger-jsdoc';
import * as cors from 'cors';

class Server {
    private app;
    constructor(private config) {
        this.app = express();
    }

    bootstrap() {
        this.setupRoutes();
        this.initBodyParser();
        console.log('bootstrap');
        return this;
    }

    initSwagger = () => {
        const options = {
            definition: {
                info: {
                    title: 'JavaScript-Server API Swagger',
                    version: '1.0.0',
                },
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'headers'
                    }
                }
            },
            basePath: '/api',
            swagger: '4.1',
            apis: ['./src/controllers/**/routes.ts'],
        };
        const swaggerSpec = swaggerDocument(options);
        return swaggerSpec;
    }

    setupRoutes() {
        this.app.use(cors());
        this.app.use('/swagger', swaggerUI.serve, swaggerUI.setup(this.initSwagger()));
        this.app.use('/health-check', (req, res) => {
            console.log('Inside Second middleware');
            res.send('I am OK');
        });
        this.initBodyParser();                   
        this.app.use('/api', routes);
        this.app.use(notFoundRoute);
        this.app.use(errorHandler);
    }

    initBodyParser() {
        this.app.use(bodyparser.json({ type: 'application/*+json' }));
        this.app.use(bodyparser.json());
    }

    run() {
        const{ app, PORT, MONGO_URL } = this.config;
        Database.open(MONGO_URL)
        .then((res) => {
            console.log('successfully connected to mongo');
        this.app.listen(PORT, (err) => {
            const message = `App is running at port ${PORT} `;
            if (err) {
                console.log(err);
            }
            console.log(message);
        });
    })
    .catch(err => console.log(err));
    }

}

export default Server;
