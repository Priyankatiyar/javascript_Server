class TraineeController {
    static instance: TraineeController;
    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }
    get(req, res, next) {
        try {
            console.log('Inside get() method of Trainee Controller');
            res.send({
                message: 'Trainees fetched sucsesfully!',
                data: [
                    {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
                ]
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }
    create(req, res, next) {
        try {
            console.log('Inside post() method of Trainee Controller');
            res.send({
                message: 'Trainees created sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }
    update(req, res, next) {
        try {
            console.log('Inside put() method of Trainee Controller');
            res.send({
                message: 'Trainees updated sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }
    delete(req, res, next) {
        try {
            console.log('Inside delete() method of Trainee Controller');
            res.send({
                message: 'Trainees deleted sucsesfully!',
                data: {
                        name: 'Priyanka',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside error', err);
        }
    }
}
export default TraineeController.getInstance();
