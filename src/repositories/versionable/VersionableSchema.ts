import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {

    constructor (options: any, collections: any) {
        const versionedOptions = Object.assign({

            createdAt: {
                default: Date.now,
                type: Date,
            },

            deletedAt: {
                required: false,
                type: Date,
            },

            updatedAt: {
                required: false,
                type: Date,
            },

            updatedBy: {
                required: false,
                type: String,
            },

            deletedBy: {
                required: false,
                type: String,
            },

            createdBy: {
                required: false,
                type: String,
            },

            originalId: {
                required: true,
                type: String,
            }
        }, options);

        super(versionedOptions, collections);
    }
}
