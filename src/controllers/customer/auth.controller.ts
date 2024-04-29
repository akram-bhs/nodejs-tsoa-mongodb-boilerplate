import { Body, Controller, Get, Header, Middlewares, OperationId, Path, Post, Route, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { CheckPasswordResetTokenRes, ResendVerificationTokenReq, ResendVerificationTokenRes, ResetPasswordReq, ResetPasswordRes, SendPasswordResetTokenReq, SendPasswordResetTokenRes, SignInUserReq, SignInUserRes, SignUpUserReq, SignUpUserRes, VerifyUserAccountRes } from '../../dto/auth.dto';
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
     * Signs up a new customer.
     * @summary Signs up a new customer.
     * @description This endpoint allows the registration of a new customer.
     * @param {string} _lng - The language code.
     * @param {SignUpUserReq} requestBody - The request body containing customer registration information.
     * @return {SignUpUserRes} 201 - Successfully signed up a new customer.
     */
    @Post('sign-up')
    @Middlewares(validatorMiddleware(SignUpUserReq, 'body'))
    @OperationId('signUpCustomer')
    public async signUpCustomer(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: SignUpUserReq
    ): Promise<SignUpUserRes> {
        const result = await this.authService.signUpUser('Customer', requestBody);
        this.setStatus(201);
        return result;
    }

    /**
     * Resends the verification token for account activation.
     * @summary Resends verification token.
     * @description This endpoint allows the customer to request a resend of the verification token for account activation.
     * @param {string} _lng - The language code.
     * @param {ResendVerificationTokenReq} requestBody - The request body containing information for token resend.
     * @return {ResendVerificationTokenRes} 200 - Successfully resent the verification token.
     */
    @Post('account-verify')
    @Middlewares(validatorMiddleware(ResendVerificationTokenReq, 'body'))
    @OperationId('resendVerificationToken')
    public async resendVerificationToken(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: ResendVerificationTokenReq
    ): Promise<ResendVerificationTokenRes> {
        const result = await this.authService.resendVerificationToken('Customer', requestBody);
        this.setStatus(200);
        return result;
    }

    /**
     * Verifies the customer's account.
     * @summary Verifies customer account.
     * @description This endpoint allows the verification of a customer's account.
     * @param {string} _lng - The language code.
     * @param {string} token - The token associated with the customer for account verification.
     * @return {VerifyUserAccountRes} 200 - Successfully verified the customer's account.
     */
    @Post('account-verify/{token}')
    @OperationId('verifyUserAccount')
    public async verifyUserAccount(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Path() token: string
    ): Promise<VerifyUserAccountRes> {
        const result = await this.authService.verifyUserAccount(token);
        this.setStatus(200);
        return result;
    }

    /**
     * Set password for a customer.
     * @summary Set password for a customer using the provided token.
     * @description This endpoint allows setting a new password for a customer by using a token.
     * @param {string} _lng - The language code.
     * @param {string} token - The token associated with the customer for password reset.
     * @param {ResetPasswordReq} requestBody - The request body containing the new password.
     * @return {SignInUserRes} 200 - Password successfully set, returns customer information for sign-in.
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
     * @summary Send a password reset token to the specified customer.
     * @description This endpoint allows sending a password reset token to a customer for password recovery.
     * @param {string} _lng - The language code.
     * @param {SendPasswordResetTokenReq} requestBody - The request body containing customer information for sending the reset token.
     * @return {SendPasswordResetTokenRes} 200 - Password reset token successfully sent.
     */
    @Post('password-reset')
    @Middlewares(validatorMiddleware(SendPasswordResetTokenReq, 'body'))
    @OperationId('sendPasswordResetToken')
    public async sendPasswordResetToken(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: SendPasswordResetTokenReq
    ): Promise<SendPasswordResetTokenRes> {
        const result = await this.authService.sendPasswordResetToken('Customer', requestBody);
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
     * Reset customer password.
     * @summary Reset customer password using the provided token.
     * @description This endpoint allows resetting the password for a customer using a token.
     * @param {string} _lng - The language code.
     * @param {string} token - The token associated with the customer for password reset.
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
     * Sign in a customer.
     * @summary Sign in a customer.
     * @description This endpoint allows signing in a customer with the provided credentials.
     * @param {string} _lng - The language code.
     * @param {SignInUserReq} requestBody - The request body containing customer credentials for sign-in.
     * @return {SignInUserRes} 200 - Successfully signed in, returns customer information.
     */
    @Post('sign-in')
    @Middlewares(validatorMiddleware(SignInUserReq, 'body'))
    @OperationId('signInUser')
    public async signInUser(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE,
        @Body() requestBody: SignInUserReq
    ): Promise<SignInUserRes> {
        const result = await this.authService.signInUser('Customer', requestBody);
        this.setStatus(200);
        return result;
    }
}