import * as fs from 'fs';
import { DEFAULT_LOCALE } from '../config/constants';
import { logger } from './logger';

interface TranslationData {
    [key: string]: string;
}

class Translator {
    private translations: { [locale: string]: TranslationData } = {};

    constructor() {
        this.loadTranslations('en', 'src/config/translations/en.json');
    }

    private loadTranslations(locale: string, path: string): void {
        try {
            const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
            this.translations[locale] = data;
        } catch (err) {
            logger.error(`Failed to load translation file for locale ${locale}: ${err}`);
        }
    }

    translate(key: string, locale: string): string {
        const defaultLocale = DEFAULT_LOCALE;

        const translationData = this.translations[locale] || this.translations[defaultLocale];
        if (!translationData) {
            logger.error(`Locale ${locale} not found, falling back to ${defaultLocale}`);
            return key;
        }

        const translation = translationData[key] || this.translations[defaultLocale][key];
        if (!translation) {
            logger.warn(`Translation key ${key} not found in locale ${locale}, falling back to ${defaultLocale}`);
            return key;
        }

        return translation;
    }
}

export default new Translator();