import { NextFunction, Request, Response } from 'express';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../config/constants';
import { Error } from '../dto/common.dto';
import { logger } from '../utils/logger';
import Translator from '../utils/translator';

export class HttpException extends Error {
    public statusCode: number;
    public errorCode: string;

    constructor(statusCode: number, errorCode: string) {
        super();
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
};

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void {
    const defaultLocale = DEFAULT_LOCALE;

    let statusCode = 500;
    let errorCode = 'SomethingWentWrong';
    let errorMessage = Translator.translate(errorCode, req.headers[LANG_CODE_HEADER] as string || defaultLocale);

    if (err instanceof HttpException) {
        statusCode = err.statusCode;
        errorCode = err.errorCode;
        errorMessage = Translator.translate(errorCode, req.headers[LANG_CODE_HEADER] as string || defaultLocale);
    }

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${statusCode}, Message:: ${errorMessage}, Details:: ${err as Error}`);

    res.status(statusCode).json({
        errors: [
            {
                code: errorCode,
                message: errorMessage
            }
        ] as Error[]
    });

    next();
}