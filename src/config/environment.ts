import * as dotenv from 'dotenv';

dotenv.config();

interface Environment {
    nodeEnv: string;
    port: number;
    maxRequestsPerHour: number;
    verificationTokenExpiration: number;
    passwordResetTokenExpiration: number;
    adminPortalUrl: string;
    customerPortalUrl: string;
    cdnUrl: string;
    mongodbUri: string;
    jwtSecretKey: string;
    jwtAccessTokenExpiresIn: string;
    jwtRefreshTokenExpiresIn: string;
    aesSecretKey: string;
    brevoApiUrl: string;
    brevoApiKey: string;
    brevoSenderName: string;
    brevoSenderEmail: string;
    brevoAccessAdminPortalTid: number;
    brevoResetPasswordTid: number;
    brevoVerifyAccountTid: number;
    awsEndpoint: string;
    awsAccessKeyId: string;
    awsSecretAccessKey: string;
    awsRegion: string;
    awsBucket: string;
    awsFolder: string;
}

export const environment: Environment = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '8080'),
    maxRequestsPerHour: parseInt(process.env.MAX_REQUESTS_PER_HOUR || '100'),
    verificationTokenExpiration: parseInt(process.env.VERIFICATION_TOKEN_EXPIRATION || '86400'),
    passwordResetTokenExpiration: parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRATION || '86400'),
    adminPortalUrl: process.env.ADMIN_PORTAL_URL || '',
    customerPortalUrl: process.env.CUSTOMER_PORTAL_URL || '',
    cdnUrl: process.env.CDN_URL || "",
    mongodbUri: process.env.MONGODB_URI || '',
    jwtSecretKey: process.env.JWT_SECRET_KEY || '',
    jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '',
    jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '',
    aesSecretKey: process.env.AES_SECRET_KEY || '',
    brevoApiUrl: process.env.BREVO_API_URL || '',
    brevoApiKey: process.env.BREVO_API_KEY || '',
    brevoSenderName: process.env.BREVO_SENDER_NAME || '',
    brevoSenderEmail: process.env.BREVO_SENDER_EMAIL || '',
    brevoAccessAdminPortalTid: parseInt(process.env.BREVO_ACCESS_ADMIN_PORTAL_TID || '0'),
    brevoResetPasswordTid: parseInt(process.env.BREVO_RESET_PASSWORD_TID || '0'),
    brevoVerifyAccountTid: parseInt(process.env.BREVO_VERIFY_ACCOUNT_TID || '0'),
    awsEndpoint: process.env.AWS_ENDPOINT || "",
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    awsRegion: process.env.AWS_REGION || "",
    awsBucket: process.env.AWS_BUCKET || "",
    awsFolder: process.env.AWS_FOLDER || ""
};