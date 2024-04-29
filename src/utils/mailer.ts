

import fetch from 'cross-fetch';
import { environment } from '../config/environment';
import { logger } from './logger';

export const sendEmail = async (templateId: number, to: string, subject: string, params: object): Promise<boolean> => {
    const resp = await fetch(environment.brevoApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': environment.brevoApiKey
        },
        body: JSON.stringify({
            templateId,
            sender: {
                name: environment.brevoSenderName,
                email: environment.brevoSenderEmail
            },
            to: [
                {
                    email: to
                }
            ],
            subject,
            params
        })
    });

    if (resp.status >= 400) {
        const respData = await resp.json();
        logger.error('Error sending email:', respData.message);
        return false;
    }
    return true;
};