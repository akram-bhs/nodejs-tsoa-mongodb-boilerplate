import { Body, Controller, Delete, Get, Header, Middlewares, OperationId, Path, Post, Put, Queries, Route, Security, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { Permission } from '../../dto/permission.dto';
import { AddRoleRes, DeleteRoleRes, GetRoleRes, GetRolesReq, GetRolesRes, RoleReq, UpdateRoleRes } from '../../dto/role.dto';
import { permissionMiddleware } from '../../middleware/permission.middleware';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { RoleService } from '../../services/role.service';

@injectable()
@Route('roles')
@Tags('Role Management')
export class RoleController extends Controller {
    constructor(private readonly RoleService: RoleService) {
        super();
    }

    /**
     * Adds a new role based on the provided request body.
     * @summary Add a new role.
     * @description This endpoint allows administrators to add a new role based on the provided request body.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {RoleReq} requestBody - The request body containing information about the role.
     * @return {AddRoleRes} 201 - Successfully added the role.
     */
    @Post()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageRoles))
    @Middlewares(validatorMiddleware(RoleReq, 'body'))
    @OperationId('addRole')
    public async addRole(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: RoleReq
    ): Promise<AddRoleRes> {
        const result = await this.RoleService.addRole(requestBody);
        this.setStatus(201);
        return result;
    }

    /**
     * Retrieves a list of roles.
     * @summary Get a list of roles.
     * @description This endpoint allows administrators to retrieve a list of roles.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} lng - The language code.
     * @return {GetRolesRes} 200 - Successfully retrieved the list of roles.
     */
    @Get()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageRoles))
    @OperationId('getRoles')
    public async getRoles(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Queries() queryParams: GetRolesReq
    ): Promise<GetRolesRes> {
        const result = await this.RoleService.getRoles(queryParams);
        this.setStatus(200);
        return result;
    }

    /**
     * Retrieves information about a specific role based on the provided role ID.
     * @summary Get role details.
     * @description This endpoint allows administrators to retrieve information about a specific role based on the provided role ID.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {string} roleId - The unique identifier of the role.
     * @return {GetRoleRes} 200 - Successfully retrieved role details.
     */
    @Get('{roleId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageRoles))
    @OperationId('getRole')
    public async getRole(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() roleId: string
    ): Promise<GetRoleRes> {
        const result = await this.RoleService.getRole(roleId);
        this.setStatus(200);
        return result;
    }

    /**
     * Updates information about a specific role based on the provided role ID and request body.
     * @summary Update role details.
     * @description This endpoint allows administrators to update information about a specific role based on the provided role ID and request body.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {string} roleId - The unique identifier of the role.
     * @param {RoleReq} requestBody - The request body containing updated information about the role.
     * @return {UpdateRoleRes} 200 - Successfully updated role details.
     */
    @Put('{roleId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageRoles))
    @Middlewares(validatorMiddleware(RoleReq, 'body'))
    @OperationId('updateRole')
    public async updateRole(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() roleId: string,
        @Body() requestBody: RoleReq
    ): Promise<UpdateRoleRes> {
        const result = await this.RoleService.updateRole(roleId, requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Deletes a specific role based on the provided role ID.
     * @summary Delete a role.
     * @description This endpoint allows administrators to delete a specific role based on the provided role ID.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {string} roleId - The unique identifier of the role to be deleted.
     * @return {DeleteRoleRes} 200 - Successfully deleted the role.
     */
    @Delete('{roleId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageRoles))
    @OperationId('deleteRole')
    public async deleteRole(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() roleId: string
    ): Promise<DeleteRoleRes> {
        const result = await this.RoleService.deleteRole(roleId);
        this.setStatus(200);
        return result;
    }
}