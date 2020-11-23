import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import * as bcrypt from 'bcrypt';

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {

    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    constructor() {
        super(userModel);
    }
    public static readOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public async createUser(data: any): Promise<IUserModel> {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        data.password = hashedPassword;
        return await super.userCreate(data);
    }

    public async updateUser(data: any): Promise<IUserModel> {
        if ('password' in data) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(data.password, salt);
            data.password = hashedPassword;
        }
        return await super.userUpdate(data);
    }

    public count() {
        return userModel.countDocuments();
    }
}

