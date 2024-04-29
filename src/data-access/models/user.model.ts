import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
    accountType: { type: String, enum: ['Admin', 'Customer'], default: 'User' },
    roleId: { type: Types.ObjectId, ref: 'Role' },
    email: {
        address: { type: String, trim: true, lowercase: true },
        verification: {
            isVerified: { type: Boolean, default: false },
            token: { type: String },
            expires: { type: Date }
        },
        new: {
            address: { type: String, trim: true, lowercase: true },
            otp: {
                isVerified: { type: Boolean },
                code: { type: String },
                expires: { type: Date }
            }
        },
        passwordReset: {
            token: { type: String },
            expires: { type: Date }
        }
    },
    phone: {
        number: { type: String, trim: true },
        verification: {
            isVerified: { type: Boolean, default: false },
            otp: {
                code: { type: String },
                expires: { type: Date }
            }
        }
    },
    password: { type: String },
    personal: {
        firstName: { type: String },
        middleName: { type: String },
        lastName: { type: String },
        avatar: {
            url: { type: String }
        },
        cover: {
            url: { type: String }
        },
        dateOfBirth: { type: Date },
        gender: { type: String },
        citizenship: { type: String }
    },
    address: {
        countryCode: { type: String },
        stateId: { type: Number },
        cityId: { type: Number },
        addressLine: { type: String },
        postalCode: { type: String }
    },
    activationStatus: { type: String, enum: ['Active', 'Inactive', 'Suspended', 'Banned'], default: 'Inactive' },
    accessControl: {
        permissions: [
            new Schema({
                permissionId: { type: Types.ObjectId, ref: 'Permission' },
                accessType: { type: String, enum: ['FullControl', 'ReadOnly'], default: 'FullControl' }
            }, { _id: false })
        ],
        hasAllPermissions: { type: Boolean, default: false }
    }
}, { collection: 'users', timestamps: true, versionKey: false });

export interface User {
    _id?: string;
    accountType: string;
    roleId?: string;
    email: {
        address: string;
        verification: {
            isVerified: boolean;
            token?: string;
            expires?: Date;
        };
        passwordReset?: {
            token: string;
            expires: Date;
        };
        new?: {
            address: string;
            otp: {
                isVerified: boolean;
                code: string;
                expires: Date;
            };
        }
    };
    phone: {
        number: string;
        verification: {
            isVerified: boolean;
            otp?: {
                code: string;
                expires: Date;
            };
        };
    };
    password?: string;
    personal: {
        firstName: string;
        middleName?: string;
        lastName: string;
        avatar?: {
            url: string;
        };
        cover?: {
            url: string;
        };
        dateOfBirth?: Date;
        gender?: string;
        citizenship?: string;
    };
    address?: {
        countryCode?: string;
        stateId?: number;
        cityId?: number;
        addressLine?: string;
        postalCode?: string;
    };
    activationStatus: string;
    accessControl?: {
        permissions: {
            permissionId: string;
            accessType: string;
        }[];
        hasAllPermissions?: boolean;
    };
    createdAt?: Date;
    updatedAt?: Date;
};

const UserModel = model<User>('User', userSchema);

export default UserModel;