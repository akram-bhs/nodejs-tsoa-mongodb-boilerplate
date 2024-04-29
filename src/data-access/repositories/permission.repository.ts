import { Model, Types } from 'mongoose';
import { singleton } from 'tsyringe';
import PermissionModel, { Permission } from '../models/permission.model';
import { PermissionData, PermissionsData } from '../../dto/permission.dto';

@singleton()
export class PermissionRepository {
    private readonly permissionModel: Model<Permission>;
    constructor() {
        this.permissionModel = PermissionModel;
    }

    public async findByCode(permissionCode: string): Promise<Permission | null> {
        return await this.permissionModel.findOne({ code: permissionCode });
    }

    public async findAll(page: number, pageSize: number, searchQuery?: string): Promise<PermissionsData | null> {
        const foundPermissions: PermissionsData[] = await this.permissionModel.aggregate([
            {
                $match: {
                    name: typeof searchQuery != 'undefined' ? { $regex: searchQuery, $options: 'i' } : { $exists: true }
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
                            $addFields: {
                                lowerName: {
                                    $toLower: '$name'
                                }
                            }
                        },
                        {
                            $sort: {
                                lowerName: 1
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                id: {
                                    $toString: '$_id'
                                },
                                code: '$code',
                                name: '$name',
                                description: '$description',
                                createdAt: '$createdAt',
                                updatedAt: '$updatedAt'
                            }
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
                        pageCount: {
                            $cond: {
                                if: { $gt: ['$paginationPipeline.totalCount', null] }, then: {
                                    $ceil: {
                                        $divide: ['$paginationPipeline.totalCount', '$pageSize']
                                    }
                                }, else: 0
                            }
                        },
                        totalCount: {
                            $cond: { if: { $gt: ['$paginationPipeline.totalCount', null] }, then: '$paginationPipeline.totalCount', else: 0 }
                        }
                    }
                }
            }
        ]);

        if (!foundPermissions || foundPermissions.length == 0) return null;
        return foundPermissions[0];
    }

    public async findDetailed(permissionId: string): Promise<PermissionData | null> {
        const foundPermissions: PermissionData[] = await this.permissionModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(permissionId)
                }
            },
            {
                $project: {
                    _id: 0,
                    id: {
                        $toString: '$_id'
                    },
                    code: '$code',
                    name: '$name',
                    description: '$description',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt'
                }
            }
        ]);

        if (!foundPermissions || foundPermissions.length == 0) return null;
        return foundPermissions[0];
    }
}