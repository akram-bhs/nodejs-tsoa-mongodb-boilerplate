import { Schema, model } from 'mongoose';

const permissionSchema = new Schema({
    code: { type: String },
    name: { type: String },
    description: { type: String }
}, { collection: 'permissions', timestamps: true, versionKey: false });

export interface Permission {
    _id?: string;
    code: string;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const PermissionModel = model<Permission>('Permission', permissionSchema);

export default PermissionModel;