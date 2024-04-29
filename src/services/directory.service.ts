import { singleton } from 'tsyringe';
import { DirectoryRepository } from '../data-access/repositories/directory.repository';
import { CountryData, CountryInfo, GetCountriesRes, GetCountryRes, GetLanguagesRes, LanguageInfo } from '../dto/directory.dto';
import { HttpException } from '../middleware/error.middleware';

@singleton()
export class DirectoryService {
    constructor(private readonly directoryRepository: DirectoryRepository) { }

    public async getLanguages(): Promise<GetLanguagesRes> {
        const foundLanguages: LanguageInfo[] = await this.directoryRepository.findLanguages();

        return {
            data: {
                items: foundLanguages
            },
            errors: [],
            warnings: []
        };
    }

    public async getCountries(lng: string): Promise<GetCountriesRes> {
        const foundCountries: CountryInfo[] = await this.directoryRepository.findCountries(lng);

        return {
            data: {
                items: foundCountries
            },
            errors: [],
            warnings: []
        };
    }

    public async getCountry(lng: string, iso3: string): Promise<GetCountryRes> {
        const countryData: CountryData | null = await this.directoryRepository.findCountry(lng, iso3);
        if (!countryData) {
            throw new HttpException(404, 'CountryNotFound');
        }

        return {
            data: countryData,
            errors: [],
            warnings: []
        };
    }
}