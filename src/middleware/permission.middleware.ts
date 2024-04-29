import { NextFunction, Request, Response } from 'express';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../config/constants';
import { PermissionRepository } from '../data-access/repositories/permission.repository';
import { UserRepository } from '../data-access/repositories/user.repository';
import { Error } from '../dto/common.dto';
import { Permission } from '../dto/permission.dto';
import translator from '../utils/translator';

export interface RequestWithUser extends Request {
    user: string;
};

export function permissionMiddleware(requiredPermissionCode: Permission) {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user;
            new PermissionRepository().findByCode(requiredPermissionCode).then(permission => {
                new UserRepository().findById(userId).then(user => {
                    if (!user) {
                        return res.status(401).json({
                            errors: [{
                                message: translator.translate('WrongAuthentication', req.headers[LANG_CODE_HEADER] as string || DEFAULT_LOCALE)
                            }] as Error[]
                        });
                    } else {
                        if (user.accountType == 'Admin') {
                            if (!user.accessControl?.hasAllPermissions) {
                                const foundPermission = user.accessControl?.permissions.find(
                                    (p: any) => p.permissionId == permission?._id
                                );
                                if (!foundPermission) {
                                    return res.status(403).json({
                                        errors: [{
                                            message: translator.translate('AccessDenied', req.headers[LANG_CODE_HEADER] as string || DEFAULT_LOCALE)
                                        }] as Error[]
                                    });
                                }
                                if (foundPermission.accessType == 'ReadOnly' && req.method != 'GET') {
                                    return res.status(403).json({
                                        errors: [{
                                            message: translator.translate('AccessDenied', req.headers[LANG_CODE_HEADER] as string || DEFAULT_LOCALE)
                                        }] as Error[]
                                    });
                                }
                            }
                        }
                        next();
                    }
                });
            });
        } catch (err) {
            next(err)
        }
    };
};