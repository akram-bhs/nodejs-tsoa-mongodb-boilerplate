import { singleton } from 'tsyringe';
import { Role } from '../data-access/models/role.model';
import { RoleRepository } from '../data-access/repositories/role.repository';
import { AddRoleRes, DeleteRoleRes, RoleReq, GetRoleRes, GetRolesRes, UpdateRoleRes, RoleData, GetRolesReq, RolesData } from '../dto/role.dto';
import { HttpException } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

@singleton()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) { }

    public async addRole(req: RoleReq): Promise<AddRoleRes> {
        const foundRole: Role | null = await this.roleRepository.findByName(req.name);
        if (foundRole) throw new HttpException(409, 'RoleAlreadyExists');

        const role: Role | null = await this.roleRepository.add({
            name: req.name,
            description: req.description,
            accessControl: req.accessControl
        });
        if (!role) {
            logger.error(`Failed to add role | request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                success: role != null,
                roleId: role._id!
            },
            errors: [],
            warnings: []
        };
    }

    public async getRoles(req: GetRolesReq): Promise<GetRolesRes> {
        const foundRoles: RolesData | null = await this.roleRepository.findAll(req.page, req.pageSize, req.q);
        if (!foundRoles) {
            logger.error(`Failed to get roles | query params: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: foundRoles,
            errors: [],
            warnings: []
        };
    }

    public async getRole(roleId: string): Promise<GetRoleRes> {
        const foundRole: RoleData | null = await this.roleRepository.findDetailed(roleId);
        if (!foundRole) {
            throw new HttpException(404, 'RoleNotFound');
        }

        return {
            data: foundRole,
            errors: [],
            warnings: []
        };
    }

    public async updateRole(roleId: string, req: RoleReq): Promise<UpdateRoleRes> {
        const [foundRole, foundRoleName] = await Promise.all([
            this.roleRepository.findById(roleId),
            this.roleRepository.findByName(req.name)
        ]);
        if (!foundRole) {
            throw new HttpException(404, 'RoleNotFound');
        }
        if (foundRoleName && foundRoleName._id?.toString() != roleId) {
            throw new HttpException(409, 'RoleAlreadyExists');
        }

        const updatedRole: Role | null = await this.roleRepository.update(roleId, req);
        if (!updatedRole) {
            logger.error(`Failed to update role | roleId: ${roleId}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                success: updatedRole != null
            },
            errors: [],
            warnings: []
        };
    }

    public async deleteRole(roleId: string): Promise<DeleteRoleRes> {
        const foundRole: Role | null = await this.roleRepository.findById(roleId);
        if (!foundRole) {
            throw new HttpException(404, 'RoleNotFound');
        }

        const deletedRole: Role | null = await this.roleRepository.delete(roleId);
        if (!deletedRole) {
            logger.error(`Failed to delete role | roleId: ${roleId}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                success: deletedRole != null
            },
            errors: [],
            warnings: []
        };
    }
}