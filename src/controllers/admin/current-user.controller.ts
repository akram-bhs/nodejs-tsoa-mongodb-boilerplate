import { Body, Controller, Get, Header, Middlewares, OperationId, Put, Request, Route, Security, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { GetUserRes, UpdateUserRes, UserReq } from '../../dto/user.dto';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { UserService } from '../../services/user.service';

@injectable()
@Route('me')
@Tags('Current User')
export class CurrentUserController extends Controller {
    constructor(private readonly userService: UserService) {
        super();
    }

    /**
     * Get current admin.
     * @summary Get information about the currently authenticated admin.
     * @description This endpoint retrieves information about the admin who is currently authenticated.
     * @param {object} req - The request object containing admin information.
     * @param {string} _lng - The language code.
     * @return {GetUserRes} 200 - Successfully retrieved information about the current admin.
     */
    @Get()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @OperationId('getCurrentAdmin')
    public async getCurrentAdmin(
        @Request() req: any,
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE
    ): Promise<GetUserRes> {
        const result = await this.userService.getUser(req.user);
        this.setStatus(200);
        return result;
    }

    /**
     * Update current admin.
     * @summary Update information for the currently authenticated admin.
     * @description This endpoint allows updating information for the admin who is currently authenticated.
     * @param {object} req - The request object containing admin information.
     * @param {string} _lng - The language code.
     * @param {UserReq} requestBody - The request body containing updated admin information.
     * @return {UpdateUserRes} 200 - Successfully updated information for the current admin.
     */
    @Put()
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(validatorMiddleware(UserReq, 'body'))
    @OperationId('updateCurrentAdmin')
    public async updateCurrentAdmin(
        @Request() req: any,
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: UserReq
    ): Promise<UpdateUserRes> {
        const result = await this.userService.updateUser(req.user, 'Admin', requestBody);
        this.setStatus(200);
        return result;
    }
}