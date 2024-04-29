import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_HEADER, REFRESH_TOKEN_HEADER } from '../config/constants';
import { environment } from '../config/environment';
import { UserRepository } from '../data-access/repositories/user.repository';
import { HttpException } from './error.middleware';

interface TokenPayload {
  sub: string;
  act: string;
  iat: number;
  exp: number;
  ref: boolean;
};

export function expressAuthentication(
  request: express.Request,
  _securityName: string,
  scopes: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    let payload: TokenPayload;
    const accessToken = request.headers[ACCESS_TOKEN_HEADER] as string;
    jwt.verify(accessToken, environment.jwtSecretKey, (err: any, decodedAccessToken: any) => {
      try {
        if (err) {
          if ((err as Error).name == 'TokenExpiredError') {
            const refreshToken = request.headers[REFRESH_TOKEN_HEADER] as string;
            jwt.verify(refreshToken, environment.jwtSecretKey, (err: any, decodedRefreshToken: any) => {
              if (err || !decodedRefreshToken.ref) {
                reject(new HttpException(401, 'WrongAuthentication'));
              } else {
                const newAccessToken = jwt.sign({ sub: decodedRefreshToken.sub, act: decodedRefreshToken.act, ref: false }, environment.jwtSecretKey, { expiresIn: environment.jwtAccessTokenExpiresIn });
                jwt.verify(newAccessToken, environment.jwtSecretKey, (err: any, decodedNewAccessToken: any) => {
                  if (err) {
                    reject(new HttpException(401, 'WrongAuthentication'));
                  } else {
                    payload = decodedNewAccessToken;
                  }
                });
              }
            });
          }
        } else {
          payload = decodedAccessToken;
        }

        if (!payload) {
          reject(new HttpException(401, 'WrongAuthentication'));
        } else {
          new UserRepository().findById(payload.sub).then(user => {
            if (!user) {
              reject(new HttpException(401, 'WrongAuthentication'));
            } else {
              if (user.activationStatus == 'Suspended') {
                reject(new HttpException(403, 'SuspendedUser'));
              } else if (user.activationStatus == 'Banned') {
                reject(new HttpException(403, 'BannedUser'));
              }
              if (!scopes.includes(payload.act)) {
                reject(new HttpException(403, 'AccessDenied'));
              }
              resolve(payload.sub);
            }
          });
        }
      } catch (err: any) {
        throw new HttpException(401, 'WrongAuthentication');
      }
    });
  })
}