import { Schema, model, Types } from 'mongoose';

const roleSchema = new Schema({
    name: { type: String },
    description: { type: String },
    accessControl: {
        permissions: [
            new Schema({
                permissionId: { type: Types.ObjectId, ref: 'Permission' },
                accessType: { type: String, enum: ['FullControl', 'ReadOnly'], default: 'FullControl' }
            }, { _id: false })
        ],
        hasAllPermissions: { type: Boolean, default: false }
    }
}, { collection: 'roles', timestamps: true, versionKey: false });

export interface Role {
    _id?: string;
    name: string;
    description?: string;
    accessControl: {
        permissions: {
            permissionId: string;
            accessType: string;
        }[];
        hasAllPermissions?: boolean;
    };
    createdAt?: Date;
    updatedAt?: Date;
};

const RoleModel = model<Role>('Role', roleSchema);

export default RoleModel;