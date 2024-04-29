import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Example } from 'tsoa';
import { ApiResponse, PaginatedList } from './common.dto';

/**
 * Represents the request payload for retrieving a list of permissions.
 * This class is used when querying permissions based on various criteria such as pagination and search query.
 */
@Example({
    page: 1,
    pageSize: 10,
    q: 'Manage'
})
export class GetPermissionsReq {
    /**
     * The page number for paginated results.
     * It must not be empty, should be an integer, and must be greater than or equal to 1.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsInt({ message: 'InvalidPageNumberFormat' })
    @Type(() => Number)
    @Min(1, { message: 'InvalidPageNumberValue' })
    page: number;

    /**
     * The number of permissions to be displayed per page.
     * It must not be empty, should be an integer, and must be greater than or equal to 5.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsInt({ message: 'InvalidPageSizeFormat' })
    @Type(() => Number)
    @Min(5, { message: 'InvalidPageSizeValue' })
    pageSize: number;

    /**
     * The search query for filtering permissions based on name or other criteria (optional).
     */
    q?: string;
}

/**
 * Represents the response payload for retrieving a list of permissions.
 * Extends the base ApiResponse class with a generic parameter of PermissionsData type.
 */
export class GetPermissionsRes extends ApiResponse<PermissionsData> { }

/**
 * Represents the data structure for permissions.
 * Extends PaginatedList with a generic parameter of PermissionData type.
 */
export class PermissionsData extends PaginatedList<PermissionData> { }

/**
 * Represents detailed information about a permission.
 */
@Example({
    id: '5f4a7b61e55b8439b5bea1b2',
    code: 'ManageUsers',
    name: 'Manage Users',
    description: 'Permission to manage user accounts',
    createdAt: '2022-01-20T12:30:00Z',
    updatedAt: '2022-01-21T09:45:00Z'
})
export class PermissionData {
    /**
     * The MongoDB ObjectId of the permission.
     */
    id: string;

    /**
     * The code associated with the permission.
     */
    code: Permission;

    /**
     * The name of the permission.
     */
    name: string;

    /**
     * The description of the permission (optional).
     */
    description?: string;

    /**
     * The date and time when the permission was created.
     */
    createdAt: Date;

    /**
     * The date and time when the permission was last updated.
     */
    updatedAt: Date;
}

/**
 * Enum representing various permissions in the system.
 */
export enum Permission {
    ManagePermissions = 'ManagePermissions',
    ManageRoles = 'ManageRoles',
    ManageUsers = 'ManageUsers'
}

export class GetPermissionRes extends ApiResponse<PermissionData> { }