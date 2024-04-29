import * as jwt from 'jsonwebtoken';
import { singleton } from 'tsyringe';
import { environment } from '../config/environment';
import { User } from '../data-access/models/user.model';
import { UserRepository } from '../data-access/repositories/user.repository';
import { AccountType, CheckPasswordResetTokenRes, ResendVerificationTokenReq, ResendVerificationTokenRes, ResetPasswordReq, ResetPasswordRes, SendPasswordResetTokenReq, SendPasswordResetTokenRes, SignInUserReq, SignInUserRes, SignUpUserReq, SignUpUserRes, VerifyUserAccountRes } from '../dto/auth.dto';
import { HttpException } from '../middleware/error.middleware';
import { decryptText } from '../utils/crypto';
import { logger } from '../utils/logger';
import { sendEmail } from '../utils/mailer';

@singleton()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }

    public async signUpUser(accountType: 'Customer', req: SignUpUserReq): Promise<SignUpUserRes> {
        const existingEmail: User | null = await this.userRepository.findByEmail(accountType, req.emailAddress.toLowerCase());
        if (existingEmail) {
            throw new HttpException(409, 'EmailAlreadyExists');
        }

        const existingPhone: User | null = await this.userRepository.findByPhone(accountType, req.phoneNumber);
        if (existingPhone) {
            throw new HttpException(409, 'PhoneAlreadyExists');
        }

        const user: User | null = await this.userRepository.add(accountType, {
            firstName: req.firstName,
            lastName: req.lastName,
            emailAddress: req.emailAddress,
            phoneNumber: req.phoneNumber,
            countryCode: req.countryCode,
            stateId: req.stateId,
            cityId: req.cityId
        }, undefined);
        if (!user) {
            logger.error(`Failed to add user | account type: ${accountType}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        const emailIsSent: boolean = await sendEmail(
            environment.brevoVerifyAccountTid,
            user.email.address,
            'Confirm your email!',
            {
                email: user.email.address,
                fullName: `${user.personal.firstName} ${user.personal.lastName}`,
                link: `${environment.customerPortalUrl}/confirm?token=${user.email.verification.token}`
            }
        );

        return {
            data: {
                success: user != null && emailIsSent
            },
            errors: [],
            warnings: []
        };
    }

    public async verifyUserAccount(verificationToken: string): Promise<VerifyUserAccountRes> {
        const verificationTokenData = decryptText(verificationToken)
        if (!verificationTokenData) {
            throw new HttpException(409, 'InvalidVerificationToken');
        }

        const existingUser: User | null = await this.userRepository.findById(verificationTokenData.userId);
        if (!existingUser?.email.verification.isVerified) {
            if (existingUser?.email.verification.token != verificationToken) {
                throw new HttpException(409, 'InvalidVerificationToken');
            }
            if (existingUser.email.verification.expires! <= new Date()) {
                throw new HttpException(409, 'VerificationTokenExpired');
            }
        } else {
            if (!existingUser.password) {
                if (existingUser.email.verification.expires! <= new Date()) {
                    throw new HttpException(409, 'PasswordNotYetCreated');
                } else {
                    return {
                        data: {
                            passwordResetToken: existingUser.email.passwordReset?.token!
                        },
                        errors: [],
                        warnings: []
                    };
                }
            }
            throw new HttpException(409, 'AccountAlreadyVerified');
        }

        const user: User | null = await this.userRepository.verifyAccount(existingUser._id!);
        if (!user) {
            logger.error(`Failed to verify user account | verification token: ${verificationToken}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                passwordResetToken: user.email.passwordReset?.token!
            },
            errors: [],
            warnings: []
        };
    }

    public async resendVerificationToken(accountType: 'Customer', req: ResendVerificationTokenReq): Promise<ResendVerificationTokenRes> {
        const existingEmail: User | null = await this.userRepository.findByEmail(accountType, req.emailAddress.toLowerCase());
        if (!existingEmail) {
            throw new HttpException(404, 'EmailNotFound');
        }

        if (existingEmail.email.verification.isVerified && existingEmail.password) {
            throw new HttpException(409, 'AccountAlreadyVerified');
        }

        const user: User | null = await this.userRepository.setVerificationToken(existingEmail._id!, req.emailAddress.toLowerCase());
        if (!user) {
            logger.error(`Failed to resend verification token | account type: ${accountType}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        const emailIsSent: boolean = await sendEmail(
            environment.brevoVerifyAccountTid,
            user.email.address,
            'Confirm your email!',
            {
                email: user.email.address,
                fullName: `${user.personal.firstName} ${user.personal.lastName}`,
                link: `${environment.customerPortalUrl}/confirm?token=${user.email.verification.token}`
            }
        );

        return {
            data: {
                success: user != null && emailIsSent
            },
            errors: [],
            warnings: []
        };
    }

    public async setPassword(passwordResetToken: string, req: ResetPasswordReq): Promise<SignInUserRes> {
        const passwordResetTokenData = decryptText(passwordResetToken);
        if (!passwordResetTokenData) {
            throw new HttpException(409, 'InvalidPasswordResetToken');
        }

        const existingUser: User | null = await this.userRepository.findById(passwordResetTokenData.userId);
        if (existingUser?.password) {
            throw new HttpException(409, 'PasswordAlreadyCreated');
        }
        if (existingUser?.email.passwordReset?.token != passwordResetToken) {
            throw new HttpException(409, 'InvalidPasswordResetToken');
        }
        if (existingUser.email.passwordReset.expires! < new Date()) {
            throw new HttpException(409, 'PasswordResetTokenExpired');
        }

        const user: User | null = await this.userRepository.resetPassword(existingUser._id!, req.newPassword);
        if (!user) {
            logger.error(`Failed to set password | password reset token: ${passwordResetToken}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                accountType: user.accountType as AccountType,
                accessToken: jwt.sign({ sub: user._id!.toString(), act: user.accountType.toLowerCase(), ref: false }, environment.jwtSecretKey, { expiresIn: environment.jwtAccessTokenExpiresIn }),
                refreshToken: jwt.sign({ sub: user._id!.toString(), act: user.accountType.toLowerCase(), ref: true }, environment.jwtSecretKey, { expiresIn: environment.jwtRefreshTokenExpiresIn })
            },
            errors: [],
            warnings: []
        };
    }

    public async sendPasswordResetToken(accountType: string, req: SendPasswordResetTokenReq): Promise<SendPasswordResetTokenRes> {
        const existingEmail: User | null = await this.userRepository.findByEmail(accountType, req.emailAddress.toLowerCase());
        if (!existingEmail) {
            throw new HttpException(404, 'EmailNotFound');
        }
        if (!existingEmail.email.verification.isVerified && !existingEmail.password && existingEmail.email.verification.expires! <= new Date()) {
            throw new HttpException(409, 'AccountNotYetVerified');
        }
        if (existingEmail.activationStatus == 'Suspended') {
            throw new HttpException(403, 'SuspendedUser');
        }
        if (existingEmail.activationStatus == 'Banned') {
            throw new HttpException(403, 'BannedUser');
        }

        const user: User | null = await this.userRepository.setPasswordReset(existingEmail._id!, req.emailAddress.toLowerCase());
        if (!user) {
            logger.error(`Failed to send password reset token | account type: ${accountType}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        const emailIsSent: boolean = await sendEmail(
            environment.brevoResetPasswordTid,
            user.email.address,
            'Reset your password',
            {
                firstName: user.personal.firstName,
                link: accountType == 'Admin' ? `${environment.adminPortalUrl}/reset-password?token=${user.email.passwordReset?.token}` : `${environment.customerPortalUrl}/reset-password?token=${user.email.passwordReset?.token}`,
                year: new Date().getFullYear()
            }
        );

        return {
            data: {
                success: user != null && emailIsSent
            },
            errors: [],
            warnings: []
        };
    }

    public async checkPasswordResetToken(passwordResetToken: string): Promise<CheckPasswordResetTokenRes> {
        const passwordResetTokenIsValid: boolean = await this.userRepository.checkPasswordResetToken(passwordResetToken);
        return {
            data: {
                isValid: passwordResetTokenIsValid
            },
            errors: [],
            warnings: []
        };
    }

    public async resetPassword(passwordResetToken: string, req: ResetPasswordReq): Promise<ResetPasswordRes> {
        const passwordResetTokenData = decryptText(passwordResetToken);
        if (!passwordResetTokenData) {
            throw new HttpException(409, 'InvalidPasswordResetToken');
        }

        const existingUser: User | null = await this.userRepository.findById(passwordResetTokenData.userId);
        if (existingUser?.activationStatus == 'Suspended') {
            throw new HttpException(409, 'SuspendedUser');
        }
        if (existingUser?.activationStatus == 'Banned') {
            throw new HttpException(409, 'BannedUser');
        }
        if (existingUser?.email.passwordReset?.token != passwordResetToken) {
            throw new HttpException(409, 'InvalidPasswordResetToken');
        }
        if (existingUser.email.passwordReset.expires! < new Date()) {
            throw new HttpException(409, 'PasswordResetTokenExpired');
        }

        const user: User | null = await this.userRepository.resetPassword(existingUser._id!, req.newPassword);
        if (!user) {
            logger.error(`Failed to reset password | password reset token: ${passwordResetToken}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                success: user != null
            },
            errors: [],
            warnings: []
        };
    }

    public async signInUser(accountType: string, req: SignInUserReq): Promise<SignInUserRes> {
        const existingUser: User | null = await this.userRepository.validate(accountType, req.emailAddress.toLowerCase(), req.password);
        if (!existingUser) {
            throw new HttpException(401, 'WrongCredentials');
        }
        if (!existingUser.email.verification.isVerified) {
            throw new HttpException(409, 'AccountNotYetVerified');
        }
        if (!existingUser.password) {
            throw new HttpException(409, 'PasswordNotYetCreated');
        }
        if (existingUser.activationStatus == 'Suspended') {
            throw new HttpException(403, 'SuspendedUser');
        }
        if (existingUser.activationStatus == 'Banned') {
            throw new HttpException(403, 'BannedUser');
        }

        const user: User | null = await this.userRepository.activate(existingUser._id!);
        if (!user) {
            logger.error(`Failed to activate user | account type: ${accountType}, request body: ${req}`);
            throw new HttpException(500, 'SomethingWentWrong');
        }

        return {
            data: {
                accountType: existingUser.accountType as AccountType,
                accessToken: jwt.sign({ sub: existingUser._id!.toString(), act: existingUser.accountType.toLowerCase(), ref: false }, environment.jwtSecretKey, { expiresIn: environment.jwtAccessTokenExpiresIn }),
                refreshToken: jwt.sign({ sub: existingUser._id!.toString(), act: existingUser.accountType.toLowerCase(), ref: true }, environment.jwtSecretKey, { expiresIn: environment.jwtRefreshTokenExpiresIn })
            },
            errors: [],
            warnings: []
        };
    }
}