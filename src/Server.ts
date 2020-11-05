import * as express from 'express';
import * as bodyparser from 'body-parser';
import notFoundRoute from './libs/routes/notFoundRoute';
import errorHandler from './libs/routes/errorHandler';
import routes from './router';
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
        // this.app.use(bodyparser.json({ type: 'application/*+json' }));
        this.app.use(bodyparser.json());
    }
    run() {
        const{ app, config: { PORT } } = this;
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('App is running.');
        });
    }
}
export default Server;
