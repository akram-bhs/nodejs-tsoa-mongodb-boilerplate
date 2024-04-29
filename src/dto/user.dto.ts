import { Type } from 'class-transformer';
import { IsEmail, IsISO31661Alpha3, IsInt, IsMongoId, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Example } from 'tsoa';
import { ApiResponse, PaginatedList, Resource, Success } from './common.dto';
import { CityInfo, CountryInfo, StateInfo } from './directory.dto';
import { AccountType } from './auth.dto';
import { AccessControlData } from './role.dto';

/**
 * Represents the request payload for creating or updating a user.
 * This class is used when information about a user, such as personal details and contact information, is provided.
 */
@Example({
    roleId: '5f4a7b61e55b8439b5bea1b2',
    firstName: 'John',
    middleName: 'Doe',
    lastName: 'Smith',
    avatar: { url: 'https://example.com/avatar.jpg' },
    cover: { url: 'https://example.com/cover.jpg' },
    emailAddress: 'john.doe@example.com',
    phoneNumber: '1234567890',
    dateOfBirth: '1990-01-01',
    gender: 'Male',
    citizenship: 'USA',
    countryCode: 'USA',
    stateId: 1,
    cityId: 123,
    addressLine: '123 Main Street',
    postalCode: '12345'
})
export class UserReq {
    /**
     * The MongoDB ObjectId of the user's role.
     * It must not be empty and should be a valid MongoDB ObjectId.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsMongoId({ message: 'InvalidObjectId' })
    roleId: string;

    /**
     * The first name of the user.
     * It must not be empty.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    firstName: string;

    /**
     * The middle name of the user (optional).
     */
    middleName?: string;

    /**
     * The last name of the user.
     * It must not be empty.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    lastName: string;

    /**
     * Avatar resource for the user (optional).
     * It can be an instance of the Resource class.
     */
    avatar?: Resource;

    /**
     * Cover resource for the user (optional).
     * It can be an instance of the Resource class.
     */
    cover?: Resource;

    /**
     * The email address of the user.
     * It must not be empty and should be a valid email address format.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsEmail({}, { message: 'InvalidEmailFormat' })
    emailAddress: string;

    /**
     * The phone number of the user.
     * It must not be empty.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    phoneNumber: string;

    /**
     * The date of birth of the user (optional).
     * It can be a string representing the date.
     */
    dateOfBirth?: string;

    /**
     * The gender of the user (optional).
     * It should be one of the values from the Gender enum.
     */
    gender?: Gender;

    /**
     * The citizenship of the user (optional).
     * It should be a valid ISO 3166-1 alpha-3 country code.
     */
    @IsOptional()
    @IsISO31661Alpha3({ message: 'InvalidCountry' })
    citizenship?: string;

    /**
     * The ISO 3166-1 alpha-3 country code of the user.
     * It must not be empty and should be a valid ISO 3166-1 alpha-3 country code.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsISO31661Alpha3({ message: 'InvalidCountry' })
    countryCode: string;

    /**
     * The ID of the state the user resides in (optional).
     * It should be a valid integer.
     */
    @IsOptional()
    @IsInt({ message: 'InvalidState' })
    stateId?: number;

    /**
     * The ID of the city the user resides in (optional).
     * It should be a valid integer.
     */
    @IsOptional()
    @IsInt({ message: 'InvalidCity' })
    cityId?: number;

    /**
     * The address line of the user (optional).
     */
    addressLine?: string;

    /**
     * The postal code of the user (optional).
     */
    postalCode?: string;
}

/**
 * Enum representing the gender of a user.
 * It can be either 'Male' or 'Female'.
 */
export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

/**
 * Represents the response payload for adding a new user.
 * Extends the base ApiResponse class with a generic parameter of AddUserData type.
 * This class is used to handle the response after successfully adding a new user.
 */
export class AddUserRes extends ApiResponse<AddUserData> { }

/**
 * Represents the data structure for the response after adding a new user.
 * This class is used to parse and store information about the success of the operation and the user's ID.
 */
@Example({
    success: true,
    userId: '5f4a7b61e55b8439b5bea1b1'
})
export class AddUserData {
    /**
     * Indicates whether the operation to add a new user was successful or not.
     */
    success: boolean;

    /**
     * The unique identifier (ID) of the newly added user.
     */
    userId: string;
}

/**
 * Represents the request payload for retrieving a list of users.
 * This class is used when querying users based on various criteria such as pagination, account type, role, activation status, and search query.
 */
@Example({
    page: 1,
    pageSize: 10,
    accountType: 'Admin',
    roleId: '5f4a7b61e55b8439b5bea1b2',
    activationStatus: 'Active',
    q: 'John Doe'
})
export class GetUsersReq {
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
     * The number of users to be displayed per page.
     * It must not be empty, should be an integer, and must be greater than or equal to 5.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    @IsInt({ message: 'InvalidPageSizeFormat' })
    @Type(() => Number)
    @Min(5, { message: 'InvalidPageSizeValue' })
    pageSize: number;

    /**
     * The type of user account (optional).
     * It should be one of the values from the AccountType enum.
     */
    accountType?: AccountType;

    /**
     * The MongoDB ObjectId of the user's role (optional).
     * It should be a valid MongoDB ObjectId.
     */
    @IsOptional()
    @IsMongoId({ message: 'InvalidObjectId' })
    roleId?: string;

    /**
     * The activation status of the user account (optional).
     * It should be one of the values from the UserActivationStatus enum.
     */
    activationStatus?: UserActivationStatus;

    /**
     * The search query for filtering users based on name or other criteria (optional).
     */
    @IsOptional()
    q?: string;
}

/**
 * Represents the response payload for retrieving a list of users.
 * Extends the base ApiResponse class with a generic parameter of UsersData type.
 */
export class GetUsersRes extends ApiResponse<UsersData> { }

/**
 * Represents the data structure for users.
 * Extends PaginatedList with a generic parameter of ShortUserData type.
 */
export class UsersData extends PaginatedList<ShortUserData> { }

/**
 * Represents a concise version of user data.
 */
@Example({
    id: '5f4a7b61e55b8439b5bea1b1',
    accountType: 'Admin',
    role: {
        id: '5f4a7b61e55b8439b5bea1b2',
        name: 'AdminRole'
    },
    fullName: 'John Doe',
    avatar: { url: 'https://example.com/avatar.jpg' },
    emailAddress: 'john.doe@example.com',
    phoneNumber: '1234567890',
    country: {
        iso2: 'US',
        iso3: 'USA',
        name: 'United States'
    },
    state: {
        id: 1,
        name: 'California'
    },
    city: {
        id: 123,
        name: 'Los Angeles'
    },
    activationStatus: 'Active',
    createdAt: '2022-01-20T12:30:00Z',
    updatedAt: '2022-01-21T09:45:00Z'
})
export class ShortUserData {
    /**
     * The MongoDB ObjectId of the user.
     */
    id: string;

    /**
     * The type of user account.
     */
    accountType: AccountType;

    /**
     * The role information of the user.
     */
    role: ShortRoleData;

    /**
     * The full name of the user.
     */
    fullName: string;

    /**
     * The avatar resource for the user (optional).
     * It can be an instance of the Resource class.
     */
    avatar?: Resource;

    /**
     * The email address of the user.
     */
    emailAddress: string;

    /**
     * The phone number of the user.
     */
    phoneNumber: string;

    /**
     * The country information of the user.
     */
    country: CountryInfo;

    /**
     * The state information of the user (optional).
     */
    state?: StateInfo;

    /**
     * The city information of the user (optional).
     */
    city?: CityInfo;

    /**
     * The activation status of the user account.
     */
    activationStatus: UserActivationStatus;

    /**
     * The date and time when the user was created.
     */
    createdAt: Date;

    /**
     * The date and time when the user was last updated.
     */
    updatedAt: Date;
}

/**
 * Represents a concise version of role data.
 */
export class ShortRoleData {
    /**
     * The MongoDB ObjectId of the user's role.
     */
    id: string;

    /**
     * The name of the role.
     */
    name: string;
}

/**
 * Enum representing the activation status of a user.
 * It can be either 'Active', 'Inactive', 'Suspended', or 'Banned'.
 */
export enum UserActivationStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Suspended = 'Suspended',
    Banned = 'Banned'
}

/**
 * Represents the response payload for retrieving detailed user data.
 * This class extends the ApiResponse class with a generic parameter of DetailedUserData type.
 */
export class GetUserRes extends ApiResponse<DetailedUserData> { }

/**
 * Represents detailed information about a user.
 * This class includes properties such as id, accountType, role, email, phone, personal, address, activationStatus, accessControl, createdAt, and updatedAt.
 */
@Example({
    id: '5f4a7b61e55b8439b5bea1b1',
    accountType: 'Admin',
    role: {
        id: '5f4a7b61e55b8439b5bea1b2',
        name: 'AdminRole'
    },
    email: {
        address: 'john.doe@example.com',
        isVerified: true
    },
    phone: {
        number: '1234567890',
        isVerified: true
    },
    personal: {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        avatar: { url: 'https://example.com/avatar.jpg' },
        cover: { url: 'https://example.com/cover.jpg' },
        dateOfBirth: '1990-01-01',
        gender: 'Male',
        citizenship: {
            iso2: 'US',
            iso3: 'USA',
            name: 'United States'
        }
    },
    address: {
        country: {
            iso2: 'US',
            iso3: 'USA',
            name: 'United States'
        },
        state: {
            id: 1,
            name: 'California'
        },
        city: {
            id: 123,
            name: 'Los Angeles'
        },
        addressLine: '123 Main Street',
        postalCode: '12345'
    },
    activationStatus: 'Active',
    accessControl: {
        permissions: [
            { permissionId: '5f4a7b61e55b8439b5bea1b3', accessType: 'FullControl' },
            { permissionId: '5f4a7b61e55b8439b5bea1b4', accessType: 'ReadOnly' }
        ],
        hasAllPermissions: false
    },
    createdAt: '2022-01-20T12:30:00Z',
    updatedAt: '2022-01-21T09:45:00Z'
}
)
export class DetailedUserData {
    /**
     * The MongoDB ObjectId of the user.
     */
    id: string;

    /**
     * The type of the user account, which can be either 'Admin' or 'Customer'.
     */
    accountType: AccountType;

    /**
     * The role information of the user.
     */
    role: ShortRoleData;

    /**
     * The email information for the user.
     */
    email: Email;

    /**
     * The phone information for the user.
     */
    phone: Phone;

    /**
     * Personal information for the user, including first name, middle name, last name, avatar, cover, date of birth, gender, and citizenship.
     */
    personal: PersonalUserData;

    /**
     * Address information for the user, including country, state, city, address line, and postal code.
     */
    address: AddressUserData;

    /**
     * The activation status of the user account (e.g., 'Active', 'Inactive', 'Suspended', 'Banned').
     */
    activationStatus: UserActivationStatus;

    /**
     * Access control information for the user.
     */
    accessControl: AccessControlData;

    /**
     * The date and time when the user was created.
     */
    createdAt: Date;

    /**
     * The date and time when the user was last updated.
     */
    updatedAt: Date;
}

/**
 * Represents email information for a user.
 */
export class Email {
    /**
     * The email address of the user.
     */
    address: string;

    /**
     * Indicates whether the email address is verified.
     */
    isVerified: boolean;
}

/**
 * Represents phone information for a user.
 */
export class Phone {
    /**
     * The phone number of the user.
     */
    number: string;

    /**
     * Indicates whether the phone number is verified.
     */
    isVerified: boolean;
}

/**
 * Represents personal information for a user.
 */
export class PersonalUserData {
    /**
     * The first name of the user.
     */
    firstName: string;

    /**
     * The middle name of the user (optional).
     */
    middleName?: string;

    /**
     * The last name of the user.
     */
    lastName: string;

    /**
     * Avatar resource for the user (optional).
     */
    avatar?: Resource;

    /**
     * Cover resource for the user (optional).
     */
    cover?: Resource;

    /**
     * The date of birth of the user (optional).
     */
    dateOfBirth?: string;

    /**
     * The gender of the user (optional).
     */
    gender?: Gender;

    /**
     * The citizenship information for the user (optional).
     */
    citizenship?: CountryInfo;
}

/**
 * Represents address information for a user.
 */
export class AddressUserData {
    /**
     * The country information for the user.
     */
    country: CountryInfo;

    /**
     * The state information for the user (optional).
     */
    state?: StateInfo;

    /**
     * The city information for the user (optional).
     */
    city?: CityInfo;

    /**
     * The address line for the user (optional).
     */
    addressLine?: string;

    /**
     * The postal code for the user (optional).
     */
    postalCode?: string;
}

/**
 * Represents the response payload for updating a user.
 * Extends the base ApiResponse class with a generic parameter of Success type.
 */
export class UpdateUserRes extends ApiResponse<Success> { }

/**
 * Represents the response payload for deleting a user.
 */
export class DeleteUserRes extends ApiResponse<Success> { }