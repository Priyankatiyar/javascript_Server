import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {

    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }
    public static findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public create(data: any): Promise<IUserModel> {
        console.log('UserReository Created Successfully!!', data);
        const id = UserRepository.generateObjectId();
        const model = new userModel({
            _id: id,
            ...data,
        });
        return model.save();
    }

    public count() {
        return userModel.countDocuments();
    }

}
