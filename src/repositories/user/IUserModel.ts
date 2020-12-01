import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument';

export default interface IUserModel extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
}
