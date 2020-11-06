import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

export const userSchema = new UserSchema({
    collections: 'user',
});

export const userMODEL: mongoose.Model<IUserModel> = mongoose.model <IUserModel>
    (
        'User',
        userSchema,
        'User',
        true,
    );
