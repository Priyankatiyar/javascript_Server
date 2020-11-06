import * as mongoose from 'mongoose';
import { userMODEL } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {

    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }

    public create(data: any): Promise<IUserModel> {
        console.log('UserReository Created Successfully!!', data);
        const id = UserRepository.generateObjectId();
        const model = new userMODEL({
            _id: id,
            ...data,
        });
        return model.save();
    }

    public count() {
        return userMODEL.countDocuments();
    }

}
