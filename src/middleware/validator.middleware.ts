import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../config/constants';
import { Error } from '../dto/common.dto';
import { logger } from '../utils/logger';
import translator from '../utils/translator';

export function validatorMiddleware(
    type: any,
    value: string | 'body' | 'query' | 'params' = 'body',
    skipMissingProperties = false
): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            validate(plainToInstance(type, req[value as keyof typeof req]), { skipMissingProperties }).then((validationErrors: ValidationError[]) => {
                if (validationErrors.length > 0) {
                    logger.error(`[${req.method}] ${req.path} >> StatusCode:: 422, Message:: Validation failed`);
                    return res.status(422).json({
                        errors: validationErrors.reduce((result: any, item: ValidationError) => {
                            for (const key in item.constraints) {
                                const code = item.constraints[key];
                                const message = translator.translate(code, req.headers[LANG_CODE_HEADER] as string || DEFAULT_LOCALE);
                                if (!result.find((obj: any) => obj.code == code)) {
                                    result.push({ code, message });
                                }
                            }
                            return result;
                        }, []) as Error[]
                    });
                } else {
                    next();
                }
            });
        } catch (err) {
            next(err)
        }
    }
}