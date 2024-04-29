import { Type } from 'class-transformer';
import { IsArray, IsInt, IsMongoId, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Example } from 'tsoa';
import { ApiResponse, PaginatedList, Success } from './common.dto';

/**
 * Represents the request payload for managing access control permissions.
 * This class is used when updating or assigning permissions to a user role.
 */
export class AccessControlReq {
    /**
     * An array of role permissions.
     * Each element is an instance of the RolePermissionReq class.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsArray({ message: 'InvalidArrayFormat' })
    @ValidateNested({ each: true })
    @Type(() => RolePermissionReq)
    permissions: RolePermissionReq[];

    /**
     * Indicates whether the user has all the specified permissions.
     * This property is optional.
     */
    hasAllPermissions?: boolean;
}

@Example({
    name: 'Admin',
    description: 'Adminstrator Role',
    accessControl: {
        permissions: [
            {
                permissionId: '61e7eb4be4a1e5b7c8db7fd1',
                accessType: 'FullControl'
            },
            {
                permissionId: '61e7eb4be4a1e5b7c8db7fd2',
                accessType: 'ReadOnly'
            }
        ],
        hasAllPermissions: true
    }
})
export class RoleReq {
    @IsNotEmpty({ message: 'RequiredFields' })
    name: string;

    description?: string;

    @IsNotEmpty({ message: 'RequiredFields' })
    @ValidateNested()
    @Type(() => RolePermissionReq)
    accessControl: AccessControlReq;
}

export class RolePermissionReq {
    /**
     * The MongoDB ObjectId of the permission.
     * It must not be empty and should be a valid MongoDB ObjectId.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsMongoId({ message: 'InvalidObjectId' })
    permissionId: string;

    /**
     * The access type for the permission (e.g., 'FullControl', 'ReadOnly').
     * It must not be empty.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    accessType: AccessType;
}

/**
 * Enum representing the type of access for a permission.
 * It can be either 'FullControl' or 'ReadOnly'.
 */
export enum AccessType {
    FullControl = 'FullControl',
    ReadOnly = 'ReadOnly'
}

export class AddRoleRes extends ApiResponse<AddRoleData> { }

@Example({
    success: true,
    roleId: '61e7eb4be4a1e5b7c8db7fd0'
})
export class AddRoleData {
    success: boolean;
    roleId: string;
}

/**
 * Represents the request payload for retrieving a list of roles.
 * This class is used when querying roles based on various criteria such as pagination and search query.
 */
@Example({
    page: 1,
    pageSize: 10,
    q: 'AdminRole'
})
export class GetRolesReq {
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
     * The number of roles to be displayed per page.
     * It must not be empty, should be an integer, and must be greater than or equal to 5.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsInt({ message: 'InvalidPageSizeFormat' })
    @Type(() => Number)
    @Min(5, { message: 'InvalidPageSizeValue' })
    pageSize: number;

    /**
     * The search query for filtering roles based on name or other criteria (optional).
     */
    q?: string;
}

/**
 * Represents the response payload for retrieving a list of roles.
 * Extends the base ApiResponse class with a generic parameter of RolesData type.
 */
export class GetRolesRes extends ApiResponse<RolesData> { }

/**
 * Represents the data structure for roles.
 * Extends PaginatedList with a generic parameter of RoleData type.
 */
export class RolesData extends PaginatedList<RoleData> { }

/**
 * Represents detailed information about a role.
 */
@Example({
    id: '5f4a7b61e55b8439b5bea1b2',
    name: 'AdminRole',
    description: 'Administrator Role',
    accessControl: {
        permissions: [
            {
                permission: {
                    id: '5f4a7b61e55b8439b5bea1b3',
                    name: 'ManageUsers'
                },
                accessType: 'FullControl'
            },
            {
                permission: {
                    id: '5f4a7b61e55b8439b5bea1b4',
                    name: 'ViewReports'
                },
                accessType: 'ReadOnly'
            }
        ],
        hasAllPermissions: true
    },
    createdAt: '2022-01-20T12:30:00Z',
    updatedAt: '2022-01-21T09:45:00Z'
})
export class RoleData {
    /**
     * The MongoDB ObjectId of the role.
     */
    id: string;

    /**
     * The name of the role.
     */
    name: string;

    /**
     * The description of the role (optional).
     */
    description?: string;

    /**
     * Access control data for the role.
     */
    accessControl: AccessControlData;

    /**
     * The date and time when the role was created.
     */
    createdAt: Date;

    /**
     * The date and time when the role was last updated.
     */
    updatedAt: Date;
}

/**
 * Represents access control data for a role.
 */
export class AccessControlData {
    /**
     * List of permissions with their corresponding access types.
     */
    permissions: RolePermissionData[];

    /**
     * Indicates whether the role has all permissions.
     */
    hasAllPermissions: boolean;
}

/**
 * Represents permission data for a role.
 */
export class RolePermissionData {
    /**
     * The permission details.
     */
    permission: PermissionShortData;

    /**
     * The type of access for the permission.
     */
    accessType: AccessType;
}

/**
 * Represents short information about a permission.
 */
export class PermissionShortData {
    /**
     * The MongoDB ObjectId of the permission.
     */
    id: string;

    /**
     * The name of the permission.
     */
    name: string;
}

/**
 * Represents detailed information about a role.
 */
export class GetRoleRes extends ApiResponse<RoleData> { }

/**
 * Represents the response payload for updating a role.
 */
export class UpdateRoleRes extends ApiResponse<Success> { }

/**
 * Represents the response payload for deleting a rol.
 */
export class DeleteRoleRes extends ApiResponse<Success> { }