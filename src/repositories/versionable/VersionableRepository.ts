import * as mongoose from 'mongoose';
import { DocumentQuery, Query } from 'mongoose';

export default class VersionableRepository <D extends mongoose.Document, M extends mongoose.Model <D>> {

    private model: M;

    constructor(model) {
        this.model = model;
    }

    public static generateObjectId() {
        return String (mongoose.Types.ObjectId());
    }

    public count() {
        return this.model.countDocuments();
    }

    public findOne(query: object) {
        return this.model.findOne(query).lean();
    }

    protected find(query = {}): DocumentQuery<D[], D> {
        return this.model.find(query);
    }

    public createUser(data: any, creator): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        const modelData = {
            ...data,
            originalId: id,
            createdBy: creator,
            _id: id,
        };

        return this.model.create(modelData);
    }

    public getUser(data: any) {
        return this.model.findOne(data);
    }

    public async update(id: string, dataToUpdate: any, updator) {

        let originalData;

        await this.findOne({ _id: id, updatedAt: undefined, deletedAt: undefined })
            .then((data) => {
                if (data === null) {
                    throw new Error('Data not Found!');
                }
                originalData = data;
                const newId = VersionableRepository.generateObjectId();
                const oldId = originalData._id;
                const oldModel = {
                    ...originalData,
                    updatedAt: Date.now(),
                    updatedBy: updator,
                    deletedAt: Date.now(),
                    deletedBy: updator,
                };

                const newData = Object.assign(JSON.parse(JSON.stringify(originalData)), dataToUpdate);

                newData._id = newId;
                newData.createdAt = Date.now();

                this.model.updateOne({ _id: oldId }, oldModel)
                    .then((res) => {
                        if (res === null) {
                            throw new Error('Unable to update record');
                        }
                        else
                            return res;
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                this.model.create(newData);


            });
    }

    public async delete(id: string, remover: string) {

        let originalData;

        await this.findOne({ _id: id, deletedAt: undefined })
            .then((data) => {
                if (data === null) {
                    throw new Error('Data not Found!');
                }

                originalData = data;
                const oldId = originalData._id;

                const modelDelete = {
                    ...originalData,
                    deletedAt: Date.now(),
                    deletedBy: remover,
                };

                this.model.updateOne({ _id: oldId }, modelDelete)
                    .then((res) => {
                        if (res === null) {
                            throw new Error('Unable to update record');
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });

    }

}
