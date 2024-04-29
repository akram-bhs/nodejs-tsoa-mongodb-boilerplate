import { NextFunction, Request, RequestHandler, Response } from 'express';
import NodeCache from 'node-cache';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../config/constants';

const cache = new NodeCache();

export function cacheMiddleware(duration: number): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const url: string = req.originalUrl || req.url;
        const lang: string | undefined = req.headers[LANG_CODE_HEADER] as string || DEFAULT_LOCALE;

        const key: string = `${url}/${lang}`;
        const cachedData: string | undefined = cache.get(key);

        if (cachedData) {
            const jsonData = JSON.parse(cachedData);
            res.json(jsonData);
        } else {
            const originalSend = res.send;

            res.send = (body?: any): Response => {
                if (res.statusCode == 200) {
                    cache.set(key, body, duration);
                }
                originalSend.call(res, body);
                return res;
            };

            next();
        }
    };
}