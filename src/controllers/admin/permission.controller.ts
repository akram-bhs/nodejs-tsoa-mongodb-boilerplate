import { Controller, Get, Header, Middlewares, OperationId, Path, Queries, Route, Security, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { GetPermissionRes, GetPermissionsReq, GetPermissionsRes, Permission } from '../../dto/permission.dto';
import { permissionMiddleware } from '../../middleware/permission.middleware';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { PermissionService } from '../../services/permission.service';

@injectable()
@Route('permissions')
@Tags('Permission Management')
export class PermissionController extends Controller {
    constructor(private readonly PermissionService: PermissionService) {
        super();
    }

    /**
     * Get a list of permissions.
     * @summary Get a list of permissions based on query parameters.
     * @description This endpoint retrieves a list of permissions based on specified query parameters.
     * @param {string} _lng - The language code.
     * @param {GetPermissionsReq} queryParams - The query parameters for filtering and pagination.
     * @return {GetPermissionsRes} 200 - Successfully retrieved the list of permissions.
     */
    @Get()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManagePermissions))
    @Middlewares(validatorMiddleware(GetPermissionsReq, 'query'))
    @OperationId('getPermissions')
    public async getPermissions(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Queries() queryParams: GetPermissionsReq
    ): Promise<GetPermissionsRes> {
        const result = await this.PermissionService.getPermissions(queryParams);
        this.setStatus(200);
        return result;
    }

    @Get('{permissionId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManagePermissions))
    @OperationId('getPermission')
    public async getPermission(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() permissionId: string
    ): Promise<GetPermissionRes> {
        const result = await this.PermissionService.getPermission(permissionId);
        this.setStatus(200);
        return result;
    }
}