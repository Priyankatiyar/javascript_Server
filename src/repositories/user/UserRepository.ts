import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }

    constructor() {
        super(userModel);
    }
    public create(data, creator) {
        return super.createUser(data, creator);
    }

    public updateUser(id, data, updator) {
        return super.update(id, data, updator);
    }

    public getUser(data) {
        return super.getUser(data);
    }

    public delete(data, deletor) {
        return super.delete(data, deletor);
    }

    public findone(data) {
        return super.findOne(data);
    }
    public find(query) {
        return super.find(query);
    }

    public count() {
        return super.count();
    }

}
