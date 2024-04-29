import { Model, Types } from 'mongoose';
import { singleton } from 'tsyringe';
import RoleModel, { Role } from '../models/role.model';
import { RoleData, RoleReq, RolesData } from '../../dto/role.dto';

@singleton()
export class RoleRepository {
    private readonly roleModel: Model<Role>;
    constructor() {
        this.roleModel = RoleModel;
    }

    public async add(role: Role): Promise<Role> {
        const addedRole: Role = await this.roleModel.create(role);
        return addedRole;
    }

    public async findById(roleId: string): Promise<Role | null> {
        return await this.roleModel.findById(roleId);
    }

    public async findByName(name: string): Promise<Role | null> {
        return await this.roleModel.findOne({ name: { $regex: `(^)${name}($)`, $options: 'i' }  });
    }

    public async findAll(page: number, pageSize: number, searchQuery?: string): Promise<RolesData | null> {
        const foundRoles: RolesData[] = await this.roleModel.aggregate([
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
                                name: '$name',
                                description: '$description',
                                accessControl: '$accessControl',
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

        if (!foundRoles || foundRoles.length == 0) return null;
        return foundRoles[0];
    }

    public async findDetailed(roleId: string): Promise<RoleData | null> {
        const foundRoles: RoleData[] = await this.roleModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(roleId)
                }
            },
            {
                $project: {
                    _id: 0,
                    id: {
                        $toString: '$_id'
                    },
                    name: '$name',
                    description: '$description',
                    accessControl: '$accessControl',
                    createdAt: '$createdAt',
                    updatedAt: '$updatedAt'
                }
            }
        ]);

        if (!foundRoles || foundRoles.length == 0) return null;
        return foundRoles[0];
    }

    public async update(roleId: string, req: RoleReq): Promise<Role | null> {
        const updatedRole: Role | null = await this.roleModel.findOneAndUpdate(
            { _id: roleId },
            {
                $set: {
                    'name': req.name,
                    'description': req.description,
                    'accessControl': req.accessControl,
                    'updatedAt': new Date()
                }
            },
            { new: true }
        );

        return updatedRole;
    }

    public async delete(roleId: string): Promise<any> {
        return await this.roleModel.findByIdAndDelete(roleId);
    }
}