import { Schema, model } from 'mongoose';

const directorySchema = new Schema({
    key: { type: String },
    value: { type: Map, of: String },
}, { collection: 'directories', timestamps: false, versionKey: false });

export interface Directory {
    _id?: string;
    key: string;
    value: Record<string, any>;
};

const DirectoryModel = model<Directory>('Directory', directorySchema);

export default DirectoryModel;