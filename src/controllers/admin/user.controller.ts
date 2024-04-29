import { Body, Controller, Delete, Get, Header, Middlewares, OperationId, Path, Post, Put, Queries, Route, Security, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { Permission } from '../../dto/permission.dto';
import { AddUserRes, DeleteUserRes, GetUserRes, GetUsersReq, GetUsersRes, UpdateUserRes, UserReq } from '../../dto/user.dto';
import { permissionMiddleware } from '../../middleware/permission.middleware';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { UserService } from '../../services/user.service';

@injectable()
@Route('users')
@Tags('User Management')
export class UserController extends Controller {
    constructor(private readonly userService: UserService) {
        super();
    }

    /**
     * Add a new user.
     * @summary Add a new user with the provided user details.
     * @description This endpoint allows the addition of a new user with the specified details.
     * @param {string} _lng - The language code.
     * @param {UserReq} requestBody - The request body containing information for the new user.
     * @param {AccountType} accountType - The account type for the new user.
     * @return {AddUserRes} 201 - Successfully added a new user.
     */
    @Post()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageUsers))
    @Middlewares(validatorMiddleware(UserReq, 'body'))
    @OperationId('addUser')
    public async addUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: UserReq
    ): Promise<AddUserRes> {
        const result = await this.userService.addUser('Admin', requestBody);
        this.setStatus(201);
        return result;
    }

    /**
     * Get a list of users.
     * @summary Get a list of users based on query parameters.
     * @description This endpoint retrieves a list of users based on specified query parameters.
     * @param {string} _lng - The language code.
     * @param {GetUsersReq} queryParams - The query parameters for filtering and pagination.
     * @return {GetUsersRes} 200 - Successfully retrieved the list of users.
     */
    @Get()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageUsers))
    @Middlewares(validatorMiddleware(GetUsersReq, 'query'))
    @OperationId('getUsers')
    public async getUsers(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Queries() queryParams: GetUsersReq
    ): Promise<GetUsersRes> {
        const result = await this.userService.getUsers(queryParams);
        this.setStatus(200);
        return result;
    }

    /**
     * Get user by ID.
     * @summary Get information about a specific user by ID.
     * @description This endpoint retrieves information about a specific user based on the provided user ID.
     * @param {string} _lng - The language code.
     * @param {string} userId - The ID of the user to retrieve.
     * @return {GetUserRes} 200 - Successfully retrieved information about the specified user.
     */
    @Get('{userId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(permissionMiddleware(Permission.ManageUsers))
    @OperationId('getUser')
    public async getUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() userId: string
    ): Promise<GetUserRes> {
        const result = await this.userService.getUser(userId);
        this.setStatus(200);
        return result;
    }

    /**
     * Updates information about a specific user.
     * @summary Update user details.
     * @description This endpoint allows administrators to update information about a specific user based on the provided user ID.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {string} userId - The unique identifier of the user.
     * @param {UserReq} requestBody - The updated information for the user.
     * @return {UpdateUserRes} 200 - Successfully updated user details.
     */
    @Put('{userId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(validatorMiddleware(UserReq, 'body'))
    @OperationId('updateUser')
    public async updateUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() userId: string,
        @Body() requestBody: UserReq
    ): Promise<UpdateUserRes> {
        const result = await this.userService.updateUser(userId, 'Admin', requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Deletes a specific user.
     * @summary Delete a user.
     * @description This endpoint allows administrators to delete a specific user based on the provided user ID.
     * @security AccessToken - Used to authenticate the request and identify the admin.
     * @security RefreshToken - Used for token refreshing.
     * @param {string} _lng - The language code.
     * @param {string} userId - The unique identifier of the user to be deleted.
     * @return {DeleteUserRes} 200 - Successfully deleted the user.
     */
    @Delete('{userId}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @OperationId('deleteUser')
    public async deleteUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() userId: string
    ): Promise<DeleteUserRes> {
        const result = await this.userService.deleteUser(userId);
        this.setStatus(200);
        return result;
    }
}