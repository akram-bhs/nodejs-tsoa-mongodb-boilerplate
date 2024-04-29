import { Body, Controller, Get, Header, Middlewares, OperationId, Path, Post, Route, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { CheckPasswordResetTokenRes, ResetPasswordReq, ResetPasswordRes, SendPasswordResetTokenReq, SendPasswordResetTokenRes, SignInUserReq, SignInUserRes } from '../../dto/auth.dto';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { AuthService } from '../../services/auth.service';

@injectable()
@Route('auth')
@Tags('User Authentication')
export class AdminAuthController extends Controller {
    constructor(private readonly authService: AuthService) {
        super();
    }

    /**
     * Set password for an admin.
     * @summary Set password for an admin using the provided token.
     * @description This endpoint allows setting a new password for an admin by using a token.
     * @param {string} _lng - The language code.
     * @param {string} token - The token associated with the admin for password reset.
     * @param {ResetPasswordReq} requestBody - The request body containing the new password.
     * @return {SignInUserRes} 200 - Password successfully set, returns admin information for sign-in.
     */
    @Post('password/{token}')
    @Middlewares(validatorMiddleware(ResetPasswordReq, 'body'))
    @OperationId('setPassword')
    public async setPassword(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() token: string,
        @Body() requestBody: ResetPasswordReq
    ): Promise<SignInUserRes> {
        const result = await this.authService.setPassword(token, requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Send password reset token.
     * @summary Send a password reset token to the specified admin.
     * @description This endpoint allows sending a password reset token to an admin for password recovery.
     * @param {string} _lng - The language code.
     * @param {SendPasswordResetTokenReq} requestBody - The request body containing admin information for sending the reset token.
     * @return {SendPasswordResetTokenRes} 200 - Password reset token successfully sent.
     */
    @Post('password-reset')
    @Middlewares(validatorMiddleware(SendPasswordResetTokenReq, 'body'))
    @OperationId('sendPasswordResetToken')
    public async sendPasswordResetToken(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: SendPasswordResetTokenReq
    ): Promise<SendPasswordResetTokenRes> {
        const result = await this.authService.sendPasswordResetToken('Admin', requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Check password reset token validity.
     * @summary Check the validity of a password reset token.
     * @description This endpoint allows checking whether a password reset token is still valid.
     * @param {string} _lng - The language code.
     * @param {string} token - The password reset token to be checked.
     * @return {CheckPasswordResetTokenRes} 200 - Token is valid, returns additional information.
     */
    @Get('password-reset/{token}')
    @OperationId('checkPasswordResetToken')
    public async checkPasswordResetToken(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() token: string
    ): Promise<CheckPasswordResetTokenRes> {
        const result = await this.authService.checkPasswordResetToken(token);
        this.setStatus(200);
        return result;
    }

    /**
     * Reset admin password.
     * @summary Reset admin password using the provided token.
     * @description This endpoint allows resetting the password for an admin using a token.
     * @param {string} _lng - The language code.
     * @param {string} token - The token associated with the admin for password reset.
     * @param {ResetPasswordReq} requestBody - The request body containing the new password.
     * @return {ResetPasswordRes} 200 - Password successfully reset.
     */
    @Post('password-reset/{token}')
    @Middlewares(validatorMiddleware(ResetPasswordReq, 'body'))
    @OperationId('resetPassword')
    public async resetPassword(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() token: string,
        @Body() requestBody: ResetPasswordReq
    ): Promise<ResetPasswordRes> {
        const result = await this.authService.resetPassword(token, requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Sign in an admin.
     * @summary Sign in an admin.
     * @description This endpoint allows signing in an admin with the provided credentials.
     * @param {string} _lng - The language code.
     * @param {SignInUserReq} requestBody - The request body containing admin credentials for sign-in.
     * @return {SignInUserRes} 200 - Successfully signed in, returns admin information.
     */
    @Post('sign-in')
    @Middlewares(validatorMiddleware(SignInUserReq, 'body'))
    @OperationId('signInUser')
    public async signInUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: SignInUserReq
    ): Promise<SignInUserRes> {
        const result = await this.authService.signInUser('Admin', requestBody);
        this.setStatus(200);
        return result;
    }
}