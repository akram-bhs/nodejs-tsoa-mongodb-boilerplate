/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminAuthController } from './../../controllers/admin/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurrentUserController } from './../../controllers/admin/current-user.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DirectoryController } from './../../controllers/admin/directory.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FileController } from './../../controllers/admin/file.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PermissionController } from './../../controllers/admin/permission.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RoleController } from './../../controllers/admin/role.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../../controllers/admin/user.controller';
import { expressAuthentication } from './../../middleware/auth.middleware';
// @ts-ignore - no great way to install types from subpackage
import { iocContainer } from './../../utils/injector';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { RequestHandler, Router } from 'express';
const multer = require('multer');
const upload = multer({"limits":{"fileSize":8388608}});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "AccountType": {
        "dataType": "refEnum",
        "enums": ["Admin","Customer"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignInUserData": {
        "dataType": "refObject",
        "properties": {
            "accountType": {"ref":"AccountType","required":true},
            "accessToken": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Error": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Warning": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignInUserRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"SignInUserData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordReq": {
        "dataType": "refObject",
        "properties": {
            "newPassword": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Success": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendPasswordResetTokenRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SendPasswordResetTokenReq": {
        "dataType": "refObject",
        "properties": {
            "emailAddress": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckPasswordResetTokenData": {
        "dataType": "refObject",
        "properties": {
            "isValid": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CheckPasswordResetTokenRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"CheckPasswordResetTokenData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResetPasswordRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SignInUserReq": {
        "dataType": "refObject",
        "properties": {
            "emailAddress": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShortRoleData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Email": {
        "dataType": "refObject",
        "properties": {
            "address": {"dataType":"string","required":true},
            "isVerified": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Phone": {
        "dataType": "refObject",
        "properties": {
            "number": {"dataType":"string","required":true},
            "isVerified": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Resource": {
        "dataType": "refObject",
        "properties": {
            "url": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Gender": {
        "dataType": "refEnum",
        "enums": ["Male","Female"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountryInfo": {
        "dataType": "refObject",
        "properties": {
            "iso2": {"dataType":"string","required":true},
            "iso3": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PersonalUserData": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "middleName": {"dataType":"string"},
            "lastName": {"dataType":"string","required":true},
            "avatar": {"ref":"Resource"},
            "cover": {"ref":"Resource"},
            "dateOfBirth": {"dataType":"string"},
            "gender": {"ref":"Gender"},
            "citizenship": {"ref":"CountryInfo"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StateInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CityInfo": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddressUserData": {
        "dataType": "refObject",
        "properties": {
            "country": {"ref":"CountryInfo","required":true},
            "state": {"ref":"StateInfo"},
            "city": {"ref":"CityInfo"},
            "addressLine": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserActivationStatus": {
        "dataType": "refEnum",
        "enums": ["Active","Inactive","Suspended","Banned"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionShortData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessType": {
        "dataType": "refEnum",
        "enums": ["FullControl","ReadOnly"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RolePermissionData": {
        "dataType": "refObject",
        "properties": {
            "permission": {"ref":"PermissionShortData","required":true},
            "accessType": {"ref":"AccessType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessControlData": {
        "dataType": "refObject",
        "properties": {
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"RolePermissionData"},"required":true},
            "hasAllPermissions": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DetailedUserData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "accountType": {"ref":"AccountType","required":true},
            "role": {"ref":"ShortRoleData","required":true},
            "email": {"ref":"Email","required":true},
            "phone": {"ref":"Phone","required":true},
            "personal": {"ref":"PersonalUserData","required":true},
            "address": {"ref":"AddressUserData","required":true},
            "activationStatus": {"ref":"UserActivationStatus","required":true},
            "accessControl": {"ref":"AccessControlData","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"DetailedUserData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserReq": {
        "dataType": "refObject",
        "properties": {
            "roleId": {"dataType":"string","required":true},
            "firstName": {"dataType":"string","required":true},
            "middleName": {"dataType":"string"},
            "lastName": {"dataType":"string","required":true},
            "avatar": {"ref":"Resource"},
            "cover": {"ref":"Resource"},
            "emailAddress": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "dateOfBirth": {"dataType":"string"},
            "gender": {"ref":"Gender"},
            "citizenship": {"dataType":"string"},
            "countryCode": {"dataType":"string","required":true},
            "stateId": {"dataType":"double"},
            "cityId": {"dataType":"double"},
            "addressLine": {"dataType":"string"},
            "postalCode": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguageInfo": {
        "dataType": "refObject",
        "properties": {
            "code": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LanguagesData": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"LanguageInfo"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetLanguagesRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"LanguagesData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountriesData": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"CountryInfo"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCountriesRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"CountriesData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StateData": {
        "dataType": "refObject",
        "properties": {
            "state": {"ref":"StateInfo","required":true},
            "cities": {"dataType":"array","array":{"dataType":"refObject","ref":"CityInfo"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CountryData": {
        "dataType": "refObject",
        "properties": {
            "country": {"ref":"CountryInfo","required":true},
            "states": {"dataType":"array","array":{"dataType":"refObject","ref":"StateData"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetCountryRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"CountryData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UploadFilesData": {
        "dataType": "refObject",
        "properties": {
            "uploadedFiles": {"dataType":"array","array":{"dataType":"refObject","ref":"Resource"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UploadFilesRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"UploadFilesData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Permission": {
        "dataType": "refEnum",
        "enums": ["ManagePermissions","ManageRoles","ManageUsers"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "code": {"ref":"Permission","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pagination": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "pageCount": {"dataType":"double","required":true},
            "totalCount": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionsData": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"PermissionData"},"required":true},
            "pagination": {"ref":"Pagination","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetPermissionsRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PermissionsData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetPermissionsReq": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "q": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetPermissionRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"PermissionData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddRoleData": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "roleId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddRoleRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"AddRoleData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RolePermissionReq": {
        "dataType": "refObject",
        "properties": {
            "permissionId": {"dataType":"string","required":true},
            "accessType": {"ref":"AccessType","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AccessControlReq": {
        "dataType": "refObject",
        "properties": {
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"RolePermissionReq"},"required":true},
            "hasAllPermissions": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleReq": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "accessControl": {"ref":"AccessControlReq","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RoleData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "accessControl": {"ref":"AccessControlData","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RolesData": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"RoleData"},"required":true},
            "pagination": {"ref":"Pagination","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRolesRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"RolesData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRolesReq": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "q": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetRoleRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"RoleData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateRoleRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteRoleRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddUserData": {
        "dataType": "refObject",
        "properties": {
            "success": {"dataType":"boolean","required":true},
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddUserRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"AddUserData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ShortUserData": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "accountType": {"ref":"AccountType","required":true},
            "role": {"ref":"ShortRoleData","required":true},
            "fullName": {"dataType":"string","required":true},
            "avatar": {"ref":"Resource"},
            "emailAddress": {"dataType":"string","required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "country": {"ref":"CountryInfo","required":true},
            "state": {"ref":"StateInfo"},
            "city": {"ref":"CityInfo"},
            "activationStatus": {"ref":"UserActivationStatus","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsersData": {
        "dataType": "refObject",
        "properties": {
            "items": {"dataType":"array","array":{"dataType":"refObject","ref":"ShortUserData"},"required":true},
            "pagination": {"ref":"Pagination","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"UsersData"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUsersReq": {
        "dataType": "refObject",
        "properties": {
            "page": {"dataType":"double","required":true},
            "pageSize": {"dataType":"double","required":true},
            "accountType": {"ref":"AccountType"},
            "roleId": {"dataType":"string"},
            "activationStatus": {"ref":"UserActivationStatus"},
            "q": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteUserRes": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"union","subSchemas":[{"ref":"Success"},{"dataType":"enum","enums":[null]}]},
            "errors": {"dataType":"array","array":{"dataType":"refObject","ref":"Error"}},
            "warnings": {"dataType":"array","array":{"dataType":"refObject","ref":"Warning"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/api/admin/v1/auth/password/:token',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.setPassword)),

            async function AdminAuthController_setPassword(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    token: {"in":"path","name":"token","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ResetPasswordReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminAuthController>(AdminAuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.setPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/auth/password-reset',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.sendPasswordResetToken)),

            async function AdminAuthController_sendPasswordResetToken(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SendPasswordResetTokenReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminAuthController>(AdminAuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.sendPasswordResetToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/auth/password-reset/:token',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.checkPasswordResetToken)),

            async function AdminAuthController_checkPasswordResetToken(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    token: {"in":"path","name":"token","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminAuthController>(AdminAuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.checkPasswordResetToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/auth/password-reset/:token',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.resetPassword)),

            async function AdminAuthController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    token: {"in":"path","name":"token","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"ResetPasswordReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminAuthController>(AdminAuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.resetPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/auth/sign-in',
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController)),
            ...(fetchMiddlewares<RequestHandler>(AdminAuthController.prototype.signInUser)),

            async function AdminAuthController_signInUser(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"SignInUserReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AdminAuthController>(AdminAuthController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.signInUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/me',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurrentUserController)),
            ...(fetchMiddlewares<RequestHandler>(CurrentUserController.prototype.getCurrentAdmin)),

            async function CurrentUserController_getCurrentAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CurrentUserController>(CurrentUserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCurrentAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/v1/me',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurrentUserController)),
            ...(fetchMiddlewares<RequestHandler>(CurrentUserController.prototype.updateCurrentAdmin)),

            async function CurrentUserController_updateCurrentAdmin(request: any, response: any, next: any) {
            const args = {
                    req: {"in":"request","name":"req","required":true,"dataType":"object"},
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CurrentUserController>(CurrentUserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateCurrentAdmin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/directories/languages',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController)),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController.prototype.getLanguages)),

            async function DirectoryController_getLanguages(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DirectoryController>(DirectoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getLanguages.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/directories/countries',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController)),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController.prototype.getCountries)),

            async function DirectoryController_getCountries(request: any, response: any, next: any) {
            const args = {
                    lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DirectoryController>(DirectoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCountries.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/directories/countries/:iso3',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController)),
            ...(fetchMiddlewares<RequestHandler>(DirectoryController.prototype.getCountry)),

            async function DirectoryController_getCountry(request: any, response: any, next: any) {
            const args = {
                    lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    iso3: {"in":"path","name":"iso3","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DirectoryController>(DirectoryController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCountry.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/files/upload',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            upload.array('files'),
            ...(fetchMiddlewares<RequestHandler>(FileController)),
            ...(fetchMiddlewares<RequestHandler>(FileController.prototype.uploadFiles)),

            async function FileController_uploadFiles(request: any, response: any, next: any) {
            const args = {
                    files: {"in":"formData","name":"files","required":true,"dataType":"array","array":{"dataType":"file"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<FileController>(FileController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.uploadFiles.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/permissions',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getPermissions)),

            async function PermissionController_getPermissions(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetPermissionsReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PermissionController>(PermissionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getPermissions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/permissions/:permissionId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(PermissionController)),
            ...(fetchMiddlewares<RequestHandler>(PermissionController.prototype.getPermission)),

            async function PermissionController_getPermission(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    permissionId: {"in":"path","name":"permissionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<PermissionController>(PermissionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getPermission.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/roles',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.addRole)),

            async function RoleController_addRole(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RoleReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RoleController>(RoleController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.addRole.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/roles',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getRoles)),

            async function RoleController_getRoles(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetRolesReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RoleController>(RoleController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getRoles.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/roles/:roleId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.getRole)),

            async function RoleController_getRole(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RoleController>(RoleController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getRole.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/v1/roles/:roleId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.updateRole)),

            async function RoleController_updateRole(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"RoleReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RoleController>(RoleController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateRole.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/v1/roles/:roleId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(RoleController)),
            ...(fetchMiddlewares<RequestHandler>(RoleController.prototype.deleteRole)),

            async function RoleController_deleteRole(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    roleId: {"in":"path","name":"roleId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<RoleController>(RoleController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteRole.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/admin/v1/users',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.addUser)),

            async function UserController_addUser(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.addUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/users',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUsers)),

            async function UserController_getUsers(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    queryParams: {"in":"queries","name":"queryParams","required":true,"ref":"GetUsersReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getUsers.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/admin/v1/users/:userId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getUser)),

            async function UserController_getUser(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/api/admin/v1/users/:userId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateUser)),

            async function UserController_updateUser(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserReq"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.updateUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/api/admin/v1/users/:userId',
            authenticateMiddleware([{"AccessToken":["admin"]},{"RefreshToken":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.deleteUser)),

            async function UserController_deleteUser(request: any, response: any, next: any) {
            const args = {
                    _lng: {"default":"en","in":"header","name":"x-lang-code","dataType":"string"},
                    userId: {"in":"path","name":"userId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<UserController>(UserController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteUser.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
