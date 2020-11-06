import * as express from 'express';
import * as bodyparser from 'body-parser';
import notFoundRoute from './libs/routes/notFoundRoute';
import errorHandler from './libs/routes/errorHandler';
import routes from './router';
import Database from './libs/Database';
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
    setupRoutes() {
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
