import * as express from 'express';
class Server {
    private app;
    constructor(private config) {
        this.app = express();
    }
    bootstrap() {
        this.setupRoutes();
        console.log('bootstrap');
        return this;
    }
    setupRoutes() {
        const { PORT } = this.config;
        console.log('PORT', PORT);
        this.app.get('/health-check', (req, res, next) => {
            res.send('I am OK');
        });
        return this;
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
