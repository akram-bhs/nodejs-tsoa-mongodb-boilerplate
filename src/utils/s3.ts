import AWS from 'aws-sdk';
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../config/environment';
import { HttpException } from '../middleware/error.middleware';
import { logger } from './logger';

export const s3Client = new AWS.S3({
    endpoint: environment.awsEndpoint,
    accessKeyId: environment.awsAccessKeyId,
    secretAccessKey: environment.awsSecretAccessKey,
    region: environment.awsRegion,
    s3ForcePathStyle: true
});

export const uploadFileToS3 = (file: Express.Multer.File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const fileExtension = path.extname(file.originalname);
        const params = {
            Bucket: environment.awsBucket,
            Key: `${environment.awsFolder}/${uuidv4()}${fileExtension}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        s3Client.upload(params, (err: any, _data: any) => {
            if (err) {
                logger.error('Error uploading to S3:', err);
                reject(new HttpException(500, 'SomethingWentWrong'));
            } else {
                resolve(`${environment.cdnUrl}/${params.Key}`);
            }
        });
    });
}