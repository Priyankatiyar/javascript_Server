import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepositories extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    constructor() {
        super(userModel);
    }
    public static readOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public create(data: any): Promise<IUserModel> {
        console.log('User Data:', data);
        const id = UserRepositories.generateObjectId();
        const model = new userModel({
            _id: id,
            ...data,
            originalId: id,
        });
        return model.save();
    }

    public count() {
        return userModel.countDocuments();
    }
}

