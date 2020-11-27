import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {
    static instance: TraineeController;
    userRepository: any;
    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            function escapeRegExp(text) {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            }

            const {skip, limit, sort} = req.query;

           if (req.query.search !== undefined) {
            const regex = new RegExp(escapeRegExp(req.query.search), 'gi');
            const extractedData = await userRepository.findAll({email: regex} || {name: regex}, {},
                {
                    limit : Number(limit),
                    skip : Number(skip),
                    sort: {[String(sort)]: req.query.sortedBy},
                    collation: ({locale: 'en'})
                });

                res.status(200).send({
                    message: 'trainee fetched successfully',
                    totalCount: await userRepository.count(req.body),
                    count: extractedData.length,
                    data: [extractedData],
                    status: 'success',
                });
            }
            else {
            const extractedData = await userRepository.findAll({}, {},
                {
                    limit : Number(limit),
                    skip : Number(skip),
                    sort: {[String(sort)]: req.query.sortedBy},
                    collation: ({locale: 'en'})
                });

            res.status(200).send({
                message: 'trainee fetched successfully',
                totalCount: await userRepository.count(req.body),
                count: extractedData.length,
                data: [extractedData],
                status: 'success',
            });
            }
        } catch (err) {
            console.log('error: ', err);
        }
    }


    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.createUser(req.body);
            res.status(200).send({
                message: 'Trainee created successfully',
                data: [result],
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const result = await userRepository.updateUser(req.body);
            res.status(200).send({
                message: 'Trainee updated successfully',
                data: [result]
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            await userRepository.delete(req.params.id);
            res.status(200).send({
                message: 'trainee deleted successfully',
                data: {},
                status: 'success',
            });
        }
        catch (err) {
            console.log('error is ', err);
        }
    }
}

export default TraineeController.getInstance();
