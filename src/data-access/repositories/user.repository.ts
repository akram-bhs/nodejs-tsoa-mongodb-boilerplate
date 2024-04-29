import { compareSync, hashSync } from 'bcryptjs';
import crypto from 'crypto';
import { Model, Types } from 'mongoose';
import otpGenerator from 'otp-generator';
import { singleton } from 'tsyringe';
import { environment } from '../../config/environment';
import { AccessControlReq } from '../../dto/role.dto';
import { DetailedUserData, UserReq, UsersData } from '../../dto/user.dto';
import UserModel, { User } from '../models/user.model';
import { encryptText } from '../../utils/crypto';

@singleton()
export class UserRepository {
    private readonly userModel: Model<User>;
    constructor() {
        this.userModel = UserModel;
    }

    public async add(accountType: string, req: Partial<UserReq>, accessControl?: AccessControlReq): Promise<User> {
        const userId = new Types.ObjectId();
        const user = new this.userModel({
            _id: userId,
            accountType,
            roleId: req.roleId,
            email: {
                address: req.emailAddress,
                verification: {
                    token: encryptText(JSON.stringify({
                        userId: userId.toHexString(),
                        token: crypto.randomBytes(32).toString('hex')
                    })),
                    expires: new Date(Date.now() + (environment.verificationTokenExpiration * 1000))
                },
                passwordReset: accountType == 'Admin' ? {
                    token: encryptText(JSON.stringify({
                        userId,
                        token: crypto.randomBytes(32).toString('hex')
                    })),
                    expires: new Date(Date.now() + (environment.passwordResetTokenExpiration * 1000))
                } : undefined
            },
            phone: {
                number: req.phoneNumber
            },
            personal: {
                firstName: req.firstName,
                middleName: req.middleName,
                lastName: req.lastName,
                avatar: req.avatar,
                cover: req.cover,
                dateOfBirth: req.dateOfBirth,
                gender: req.gender,
                citizenship: req.citizenship
            },
            address: {
                countryCode: req.countryCode,
                stateId: req.stateId,
                cityId: req.cityId,
                addressLine: req.addressLine,
                postalCode: req.postalCode
            },
            accessControl
        });

        const addedUser = await user.save();
        return addedUser;
    }

    public async findById(userId: string): Promise<User | null> {
        return await this.userModel.findById(userId);
    }

    public async findByEmail(accountType: string, emailAddress: string): Promise<User | null> {
        return await this.userModel.findOne({ accountType, 'email.address': emailAddress });
    }

    public async findByPhone(accountType: string, phoneNumber: string): Promise<User | null> {
        return await this.userModel.findOne({ accountType, 'phone.number': phoneNumber });
    }

    public async setVerificationToken(userId: string, email: string): Promise<User | null> {
        return await this.userModel.findOneAndUpdate(
            { 'email.address': email },
            {
                'email.verification.token': encryptText(JSON.stringify({
                    userId,
                    token: crypto.randomBytes(32).toString('hex')
                })),
                'email.verification.expires': new Date(Date.now() + (environment.verificationTokenExpiration * 1000)),
                'updatedAt': new Date()
            },
            { new: true }
        );
    }

    public async verifyAccount(userId: string): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'email.verification.isVerified': true,
                    'email.passwordReset.token': encryptText(JSON.stringify({
                        userId,
                        token: crypto.randomBytes(32).toString('hex')
                    })),
                    'email.passwordReset.expires': new Date(Date.now() + (environment.passwordResetTokenExpiration * 1000)),
                    'updatedAt': new Date()
                }
            },
            { new: true }
        );
    }

    public async setPasswordReset(userId: string, email: string): Promise<User | null> {
        return await this.userModel.findOneAndUpdate(
            { 'email.address': email },
            {
                'email.passwordReset.token': encryptText(JSON.stringify({
                    userId,
                    token: crypto.randomBytes(32).toString('hex')
                })),
                'email.passwordReset.expires': new Date(Date.now() + (environment.passwordResetTokenExpiration * 1000)),
                'updatedAt': new Date()
            },
            { new: true }
        );
    }

    public async checkPasswordResetToken(token: string): Promise<boolean> {
        const foundUser: User | null = await this.userModel.findOne({ 'email.passwordReset.token': token });
        if (!foundUser) return false;
        if (foundUser.email.passwordReset?.expires) {
            return foundUser.email.passwordReset?.expires > new Date()
        } else {
            return false;
        }
    }

    public async resetPassword(userId: string, newPassword: string): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    password: hashSync(newPassword, 10),
                    'updatedAt': new Date()
                },
                $unset: {
                    'email.verification.token': 1,
                    'email.verification.expires': 1,
                    'email.passwordReset': 1
                }
            },
            { new: true }
        );
    }

    public async validate(accountType: string, email: string, password: string): Promise<User | null> {
        const foundUser = await this.userModel.findOne({ accountType, 'email.address': email });
        if (!foundUser) return null;

        const isPasswordValid = compareSync(password, foundUser.password!);
        if (!isPasswordValid) return null;

        return foundUser;
    }

    public async activate(userId: string): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    activationStatus: 'Active',
                    'updatedAt': new Date()
                }
            },
            { new: true }
        );
    }

    public async checkPasswordIsCorrect(userId: string, password: string): Promise<boolean> {
        const foundUser = await this.userModel.findById(userId);
        if (!foundUser) return false;
        return compareSync(password, foundUser.password!);
    }

    public async update(userId: string, req: UserReq): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'email.address': req.emailAddress,
                    'phone.number': req.phoneNumber,
                    'personal.firstName': req.firstName,
                    'personal.middleName': req.middleName,
                    'personal.lastName': req.lastName,
                    'personal.avatar.url': req.avatar?.url,
                    'personal.cover.url': req.cover?.url,
                    'personal.dateOfBirth': req.dateOfBirth,
                    'personal.gender': req.gender,
                    'personal.citizenship': req.citizenship,
                    'address.countryCode': req.countryCode,
                    'address.stateId': req.stateId,
                    'address.cityId': req.cityId,
                    'address.addressLine': req.addressLine,
                    'address.postalCode': req.postalCode,
                    'updatedAt': new Date()
                },
                $unset: {
                    'email.new': 1
                }
            },
            { new: true }
        );
    }

    public async setEmailVerificationOtp(userId: string, email: string): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'email.new.address': email,
                    'email.new.otp.isVerified': false,
                    'email.new.otp.code': otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }),
                    'email.new.otp.expires': new Date(Date.now() + (environment.verificationTokenExpiration * 1000)),
                    'updatedAt': new Date()
                }
            },
            { new: true }
        );
    }

    public async verifyEmailOtp(userId: string): Promise<User | null> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'email.new.otp.isVerified': true,
                    'updatedAt': new Date()
                },
                $unset: {
                    'email.new.otp.code': 1,
                    'email.new.otp.expires': 1
                }
            },
            { new: true }
        );
    }

    public async findUsers(page: number, pageSize: number, accountType?: string, roleId?: string, activationStatus?: string, searchQuery?: string): Promise<UsersData | null> {
        const searchFilter = typeof searchQuery != 'undefined' ? { $regex: searchQuery, $options: 'i' } : { $exists: true };
        const foundUsers: UsersData[] = await this.userModel.aggregate([
            {
                $match: {
                    accountType: typeof accountType != 'undefined' ? accountType : { $exists: true },
                    roleId: typeof roleId != 'undefined' ? new Types.ObjectId(roleId) : { $exists: true },
                    activationStatus: typeof activationStatus != 'undefined' ? activationStatus : { $exists: true },
                }
            },
            {
                $addFields: {
                    fullName: {
                        $cond: {
                            if: { $and: [{ $gt: ['$personal.middleName', null] }, { $ne: ['$personal.middleName', null] }, { $ne: ['$personal.middleName', ''] }] },
                            then: { $concat: ['$personal.firstName', ' ', '$personal.middleName', ' ', '$personal.lastName'] },
                            else: { $concat: ['$personal.firstName', ' ', '$personal.lastName'] }
                        }
                    }
                }
            },
            {
                $match: {
                    $or: [
                        {
                            fullName: searchFilter
                        },
                        {

                            'email.address': searchFilter
                        },
                        {
                            'phone.number': searchFilter
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: '$role',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'directories',
                    let: { countryCode: '$address.countryCode' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$key', 'countries'] },
                                        { $eq: ['$value.iso3', '$$countryCode'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'country'
                }
            },
            {
                $unwind: {
                    path: '$country',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'directories',
                    let: {
                        countryCode: '$address.countryCode',
                        stateId: '$address.stateId',
                        cityId: '$address.cityId'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$key', 'countries'] },
                                        { $eq: ['$value.iso3', '$$countryCode'] }
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$value.states',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$value.states.id', '$$stateId']
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$value.states.cities',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$value.states.cities.id', '$$cityId']
                                }
                            }
                        },
                    ],
                    as: 'location'
                }
            },
            {
                $unwind: {
                    path: '$location',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    lowerFullname: {
                        $toLower: '$fullName'
                    }
                }
            },
            {
                $sort: {
                    lowerFullname: 1
                }
            },
            {
                $facet: {
                    paginationPipeline: [
                        {
                            $group: {
                                _id: null,
                                totalCount: {
                                    $sum: 1
                                }
                            }
                        }
                    ],
                    mainPipeline: [
                        {
                            $project: {
                                _id: 0,
                                id: {
                                    $toString: '$_id'
                                },
                                accountType: '$accountType',
                                role: {
                                    id: {
                                        $toString: '$role._id'
                                    },
                                    name: '$role.name'
                                },
                                fullName: '$fullName',
                                avatar: {
                                    url: {
                                        $cond: { if: { $gt: ['$personal.avatar.url', null] }, then: '$personal.avatar.url', else: null }
                                    }
                                },
                                emailAddress: '$email.address',
                                phoneNumber: '$phone.number',
                                country: {
                                    iso2: '$country.value.iso2',
                                    iso3: '$country.value.iso3',
                                    name: '$country.value.name.default'
                                },
                                state: {
                                    $cond: {
                                        if: { $gt: ['$location.value.states.id', null] }, then: {
                                            id: '$location.value.states.id',
                                            name: '$location.value.states.name.default'
                                        }, else: null
                                    }
                                },
                                city: {
                                    $cond: {
                                        if: { $gt: ['$location.value.states.cities.id', null] }, then: {
                                            id: '$location.value.states.cities.id',
                                            name: '$location.value.states.cities.name.default'
                                        }, else: null
                                    }
                                },
                                activationStatus: '$activationStatus',
                                createdAt: '$createdAt',
                                updatedAt: '$updatedAt'
                            }
                        },
                        {
                            $project: {
                                id: '$id',
                                accountType: '$accountType',
                                role: '$role',
                                fullName: '$fullName',
                                avatar: '$avatar',
                                emailAddress: '$emailAddress',
                                phoneNumber: '$phoneNumber',
                                country: '$country',
                                state: '$state',
                                city: '$city',
                                activationStatus: '$activationStatus',
                                createdAt: '$createdAt',
                                updatedAt: '$updatedAt'
                            }
                        },
                        {
                            $skip: (page - 1) * pageSize
                        },
                        {
                            $limit: pageSize
                        }
                    ]
                }
            },
            {
                $unwind: {
                    path: '$paginationPipeline',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    page,
                    pageSize
                }
            },
            {
                $project: {
                    items: '$mainPipeline',
                    pagination: {
                        page: '$page',
                        pageSize: '$pageSize',
                        totalPages: {
                            $cond: {
                                if: { $gt: ['$paginationPipeline.totalCount', null] }, then: {
                                    $ceil: {
                                        $divide: ['$paginationPipeline.totalCount', '$pageSize']
                                    }
                                }, else: 0
                            }
                        },
                        totalItems: {
                            $cond: { if: { $gt: ['$paginationPipeline.totalCount', null] }, then: '$paginationPipeline.totalCount', else: 0 }
                        }
                    }
                }
            }
        ]);

        if (!foundUsers || foundUsers.length == 0) return null;
        return foundUsers[0];
    }

    public async findUser(userId: string): Promise<DetailedUserData | null> {
        const foundUsers: DetailedUserData[] = await this.userModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $unwind: {
                    path: '$role',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'directories',
                    let: { countryCode: '$personal.citizenship' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$key', 'countries'] },
                                        { $eq: ['$value.iso3', '$$countryCode'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'citizenship'
                }
            },
            {
                $unwind: {
                    path: '$citizenship',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'directories',
                    let: { countryCode: '$address.countryCode' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$key', 'countries'] },
                                        { $eq: ['$value.iso3', '$$countryCode'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'country'
                }
            },
            {
                $unwind: {
                    path: '$country',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'directories',
                    let: {
                        countryCode: '$address.countryCode',
                        stateId: '$address.stateId',
                        cityId: '$address.cityId'
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$key', 'countries'] },
                                        { $eq: ['$value.iso3', '$$countryCode'] }
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$value.states',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$value.states.id', '$$stateId']
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$value.states.cities',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$value.states.cities.id', '$$cityId']
                                }
                            }
                        },
                    ],
                    as: 'location'
                }
            },
            {
                $unwind: {
                    path: '$location',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 0,
                    id: {
                        $toString: '$_id'
                    },
                    accountType: '$accountType',
                    role: {
                        id: {
                            $toString: '$role._id'
                        },
                        name: '$role.name'
                    },
                    email: {
                        address: '$email.address',
                        isVerified: '$email.verification.isVerified'
                    },
                    phone: {
                        number: '$phone.number',
                        isVerified: '$phone.verification.isVerified'
                    },
                    personal: {
                        firstName: '$personal.firstName',
                        middleName: '$personal.middleName',
                        lastName: '$personal.lastName',
                        avatar: {
                            url: {
                                $cond: { if: { $gt: ['$personal.avatar.url', null] }, then: '$personal.avatar.url', else: null }
                            }
                        },
                        cover: {
                            url: {
                                $cond: { if: { $gt: ['$personal.cover.url', null] }, then: '$personal.cover.url', else: null }
                            }
                        },
                        dateOfBirth: '$personal.dateOfBirth',
                        gender: '$personal.gender',
                        citizenship: {
                            $cond: {
                                if: { $gt: ['$citizenship', null] }, then: {
                                    iso2: '$citizenship.value.iso2',
                                    iso3: '$citizenship.value.iso3',
                                    name: '$citizenship.value.name.default'
                                }, else: null
                            }
                        }
                    },
                    address: {
                        country: {
                            iso2: '$country.value.iso2',
                            iso3: '$country.value.iso3',
                            name: '$country.value.name.default'
                        },
                        state: {
                            $cond: {
                                if: { $gt: ['$location.value.states.id', null] }, then: {
                                    id: '$location.value.states.id',
                                    name: '$location.value.states.name.default'
                                }, else: null
                            }
                        },
                        city: {
                            $cond: {
                                if: { $gt: ['$location.value.states.cities.id', null] }, then: {
                                    id: '$location.value.states.cities.id',
                                    name: '$location.value.states.cities.name.default'
                                }, else: null
                            }
                        },
                        addressLine: '$address.addressLine',
                        postalCode: '$address.postalCode'
                    },
                    activationStatus: '$activationStatus',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt'
                }
            },
            {
                $project: {
                    id: '$id',
                    accountType: '$accountType',
                    email: '$email',
                    phone: '$phone',
                    personal: '$personal',
                    address: '$address',
                    activationStatus: '$activationStatus',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt'
                }
            }
        ]);

        if (!foundUsers || foundUsers.length == 0) return null;
        return foundUsers[0];
    }

    public async delete(userId: string): Promise<any> {
        return await this.userModel.findByIdAndDelete(userId);
    }
}