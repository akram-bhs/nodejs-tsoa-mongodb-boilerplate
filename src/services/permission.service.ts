import { singleton } from 'tsyringe';
import { PermissionRepository } from '../data-access/repositories/permission.repository';
import { GetPermissionsRes, GetPermissionsReq, PermissionsData, GetPermissionRes, PermissionData } from '../dto/permission.dto';
import { HttpException } from '../middleware/error.middleware';
import { logger } from '../utils/logger';

@singleton()
export class PermissionService {
    constructor(private readonly permissionRepository: PermissionRepository) { }

    public async getPermissions(req: GetPermissionsReq): Promise<GetPermissionsRes> {
        const foundPermissions: PermissionsData | null = await this.permissionRepository.findAll(req.page, req.pageSize, req.q);
        if (!foundPermissions) {
            logger.error(`Failed to get permissions | query params: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: foundPermissions,
            errors: [],
            warnings: []
        };
    }

    public async getPermission(permissionId: string): Promise<GetPermissionRes> {
        const foundPermission: PermissionData | null = await this.permissionRepository.findDetailed(permissionId);
        if (!foundPermission) {
            throw new HttpException(404, 'PermissionNotFound');
        }

        return {
            data: foundPermission,
            errors: [],
            warnings: []
        };
    }
}