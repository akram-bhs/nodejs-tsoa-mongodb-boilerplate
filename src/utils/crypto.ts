import * as CryptoJS from 'crypto-js';
import { environment } from '../config/environment';
import { logger } from './logger';

export const encryptText = (text: string): string => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(text, environment.aesSecretKey, {
        iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return iv.toString() + encrypted.toString();
}

export const decryptText = (ciphertext: string): any | null => {
    const ivHex = ciphertext.slice(0, 32);
    const encryptedText = ciphertext.slice(32);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const decrypted = CryptoJS.AES.decrypt(encryptedText, environment.aesSecretKey, {
        iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    const isJson = /^[\],:{}\s]*$/.test(
        decryptedText
            .replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    );

    if (isJson && decryptedText != '') {
        return JSON.parse(decryptedText);
    } else {
        logger.error(`Error parsing decrypted text as JSON | ciphertext: ${ciphertext}`);
        return null;
    }
};