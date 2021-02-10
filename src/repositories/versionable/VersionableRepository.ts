import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';
import IUserModel from '../user/IUserModel';
import * as bcrypt from 'bcrypt';

export default class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public model: M;

    constructor(model) {
        this.model = model;
    }

    public async userCreate(data: IUserModel): Promise<D> {
        const id = VersionableRepository.generateObjectId();
        const model = new this.model({
            ...data,
            _id: id,
            originalId: id,
        });
        return await model.save();
    }

    public count(query: any): Query<number> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.count(finalQuery);
    }

    public findOne(query: any): DocumentQuery<D, D> {
        console.log(this.model);
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.findOne(finalQuery);
    }

    public findAll(query: any, projection: any, options: any): DocumentQuery<D[], D> {
        const finalQuery = { deletedAt: undefined, ...query };
        return this.model.find(finalQuery, projection, options);
    }

    public invalidate(id: string): DocumentQuery<D, D> {
        const query: any = { originalId: id, deletedAt: { $exists: false } };
        const data: any = { deletedAt: Date.now() };
        return this.model.updateOne(query, data);
    }

    public async delete(id: string): Promise<D> {
        const previous = await this.findOne({ originalId: id, deletedAt: undefined });
        console.log('oginal', id);
        console.log('delete previous', previous);
        if (previous) {
            return await this.invalidate(id);
        }
        else {
            return null;
        }
    }

    public async userUpdate(data: any): Promise<D> {
        const previous = await this.findOne({ originalId: data.id, deletedAt: undefined });
        console.log('previous: ', previous);

        if (previous) {
            await this.invalidate(data.id);
        }
        else {
            return undefined;
        }

        const newData = Object.assign(JSON.parse(JSON.stringify(previous)), data);
        newData._id = VersionableRepository.generateObjectId();

        delete newData.deletedAt;

        const model = new this.model(newData);
        return await model.save();

    }

}
