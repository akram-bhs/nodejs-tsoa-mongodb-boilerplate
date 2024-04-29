import { Controller, OperationId, Post, Route, Security, Tags, UploadedFiles } from 'tsoa';
import { injectable } from 'tsyringe';
import { Resource } from '../../dto/common.dto';
import { UploadFilesRes } from '../../dto/file.dto';
import { uploadFileToS3 } from '../../utils/s3';

@injectable()
@Route('files')
@Tags('Files Upload')
export class FileController extends Controller {
    constructor() {
        super();
    }

    /**
     * Upload files.
     * @summary Upload files to the server.
     * @description This endpoint allows users to upload files.
     * @param {Express.Multer.File[]} files - The array of files to be uploaded.
     * @return {UploadFilesRes} 200 - Successfully uploaded files.
     */
    @Post('upload')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @OperationId('uploadFiles')
    public async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<UploadFilesRes> {
        const s3FileUrls = await Promise.all(files.map(uploadFileToS3));
        const uploadedFiles: Resource[] = s3FileUrls.map((file: string) => {
            return {
                url: file
            };
        });

        return {
            data: {
                uploadedFiles
            },
            errors: [],
            warnings: []
        };
    }
}