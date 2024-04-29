import { Example } from 'tsoa';
import { ApiResponse, Resource } from './common.dto';

/**
 * Represents the response payload for uploading files.
 * Extends the base ApiResponse class with a generic parameter of UploadFilesData type.
 */
export class UploadFilesRes extends ApiResponse<UploadFilesData> { }

/**
 * Represents data structure for uploaded files.
 */
@Example({
    uploadedFiles: [
        { url: 'https://example.com/file1.jpg' },
        { url: 'https://example.com/file2.pdf' }
    ]
})
export class UploadFilesData {
    /**
     * An array containing information about the uploaded files.
     * Each element is an instance of the Resource class.
     */
    uploadedFiles: Resource[];
}
