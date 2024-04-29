import { IsEmail, IsISO31661Alpha3, IsInt, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Example } from 'tsoa';
import { ApiResponse, Success } from './common.dto';

/**
 * Represents the request payload for user registration.
 */
@Example({
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    countryCode: 'USA',
    stateId: 1,
    cityId: 123
})
export class SignUpUserReq {
    /**
     * First name of the user.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    firstName: string;

    /**
     * Last name of the user.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    lastName: string;

    /**
     * Email address of the user.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsEmail({}, { message: 'InvalidEmailFormat' })
    emailAddress: string;

    /**
     * Phone number of the user.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    phoneNumber: string;

    /**
     * Country code of the user.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsISO31661Alpha3({ message: 'InvalidCountry' })
    countryCode: string;

    /**
     * Optional state ID.
     */
    @IsOptional()
    @IsInt({ message: 'InvalidState' })
    stateId?: number;

    /**
     * Optional city ID.
     */
    @IsOptional()
    @IsInt({ message: 'InvalidCity' })
    cityId?: number;
}

/**
 * Represents the response payload for user registration.
 */
export class SignUpUserRes extends ApiResponse<Success> { }

/**
 * Represents the response payload for verifying user account.
 */
export class VerifyUserAccountRes extends ApiResponse<VerifyUserAccountData> { }

/**
 * Represents additional data returned after verifying user account.
 */
@Example({
    passwordResetToken: 'a1b2c3d4e5f6'
})
export class VerifyUserAccountData {
    /**
     * Token for resetting the user's password.
     */
    passwordResetToken: string;
}

/**
 * Represents the request payload for resending a verification token.
 */
@Example({
    emailAddress: 'john.doe@example.com'
})
export class ResendVerificationTokenReq {
    /**
     * Email address for which the verification token should be resent.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsEmail({}, { message: 'InvalidEmailFormat' })
    emailAddress: string;
}

/**
 * Represents the response payload for resending a verification token.
 */
export class ResendVerificationTokenRes extends ApiResponse<Success> { }

/**
 * Represents the request payload for sending a password reset token.
 * This class is used when a user requests a password reset and provides their email address.
 */
@Example({
    emailAddress: 'john.doe@example.com'
})
export class SendPasswordResetTokenReq {
    /**
     * Email address of the user requesting a password reset.
     * It should be a valid email address format.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsEmail({}, { message: 'InvalidEmailFormat' })
    emailAddress: string;
}

/**
 * Represents the response payload for sending a password reset token.
 * Extends the base ApiResponse class with a generic parameter of Success type.
 * This class is used to handle the response after sending a password reset token.
 */
export class SendPasswordResetTokenRes extends ApiResponse<Success> { }

/**
 * Represents the response payload for checking the validity of a password reset token.
 * Extends the base ApiResponse class with a generic parameter of CheckPasswordResetTokenData type.
 * This class is used to handle the response after checking the validity of a password reset token.
 */
export class CheckPasswordResetTokenRes extends ApiResponse<CheckPasswordResetTokenData> { }

/**
 * Represents the data structure for checking the validity of a password reset token.
 * This class is used to parse and store the information about whether a password reset token is valid or not.
 */
@Example({
    isValid: true
})
export class CheckPasswordResetTokenData {
    /**
     * Indicates whether the password reset token is valid or not.
     */
    isValid: boolean;
}

/**
 * Represents the request payload for resetting a user's password.
 * This class is used when a user is resetting their password and provides a new password.
 */
@Example({
    newPassword: 'NewPassw0rd'
})
export class ResetPasswordReq {
    /**
     * The new password for the user account.
     * It must not be empty and should have a minimum length of 8 characters.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @MinLength(8, { message: 'PasswordLength' })
    newPassword: string;
}

/**
 * Represents the response payload for resetting a user's password.
 * Extends the base ApiResponse class with a generic parameter of Success type.
 * This class is used to handle the response after successfully resetting a user's password.
 */
export class ResetPasswordRes extends ApiResponse<Success> { }

/**
 * Represents the request payload for user sign-in.
 * This class is used when a user is trying to sign in and provides their email address and password.
 */
@Example({
    emailAddress: 'john.doe@example.com',
    password: 'Password123'
})
export class SignInUserReq {
    /**
     * Email address of the user signing in.
     * It should be a valid email address format.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsEmail({}, { message: 'InvalidEmailFormat' })
    emailAddress: string;

    /**
     * Password of the user signing in.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    password: string;
}

/**
 * Represents the response payload for user sign-in.
 * Extends the base ApiResponse class with a generic parameter of SignInUserData type.
 * This class is used to handle the response after successfully signing in a user.
 */
export class SignInUserRes extends ApiResponse<SignInUserData> { }

/**
 * Represents the data structure for user sign-in response.
 * This class is used to parse and store information about the signed-in user, including account type and tokens.
 */
@Example({
    accountType: 'User',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
})
export class SignInUserData {
    /**
     * The type of the user account, which can be either 'Admin' or 'Customer'.
     */
    accountType: AccountType;

    /**
     * Access token for the signed-in user.
     */
    accessToken: string;

    /**
     * Refresh token for the signed-in user.
     */
    refreshToken: string;
}

/**
 * Enum representing the type of user account.
 * It can be either 'Admin' or 'Customer'.
 */
export enum AccountType {
    Admin = 'Admin',
    Customer = 'Customer'
}