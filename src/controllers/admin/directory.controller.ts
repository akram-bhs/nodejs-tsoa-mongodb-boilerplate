import { Controller, Get, Header, Middlewares, OperationId, Path, Route, Security, Tags } from 'tsoa';
import { injectable } from 'tsyringe';
import { DEFAULT_LOCALE, LANG_CODE_HEADER } from '../../config/constants';
import { GetCountriesRes, GetCountryRes, GetLanguagesRes } from '../../dto/directory.dto';
import { cacheMiddleware } from '../../middleware/cache.middleware';
import { DirectoryService } from '../../services/directory.service';

@injectable()
@Route('directories')
@Tags('Multilingual Directories')
export class DirectoryController extends Controller {
    constructor(private readonly directoryService: DirectoryService) {
        super();
    }

    /**
     * Get supported languages.
     * @summary Get a list of supported languages.
     * @description This endpoint retrieves a list of supported languages.
     * @param {string} _lng - The language code.
     * @return {GetLanguagesRes} 200 - Successfully retrieved the list of supported languages.
     */
    @Get('languages')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(cacheMiddleware(60 * 60 * 24 * 30))
    @OperationId('getLanguages')
    public async getLanguages(
        @Header(LANG_CODE_HEADER) _lng: string = DEFAULT_LOCALE
    ): Promise<GetLanguagesRes> {
        const result = await this.directoryService.getLanguages();
        this.setStatus(200);
        return result;
    }

    /**
     * Get supported countries.
     * @summary Get a list of supported countries.
     * @description This endpoint retrieves a list of supported countries.
     * @param {string} lng - The language code.
     * @return {GetCountriesRes} 200 - Successfully retrieved the list of supported countries.
     */
    @Get('countries')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(cacheMiddleware(60 * 60 * 24 * 30))
    @OperationId('getCountries')
    public async getCountries(
        @Header(LANG_CODE_HEADER) lng: string = DEFAULT_LOCALE
    ): Promise<GetCountriesRes> {
        const result = await this.directoryService.getCountries(lng);
        this.setStatus(200);
        return result;
    }

    /**
     * Get information about a specific country.
     * @summary Get information about a specific country by ISO3 code.
     * @description This endpoint retrieves information about a specific country based on the provided ISO3 code.
     * @param {string} lng - The language code.
     * @param {string} iso3 - The ISO3 code of the country to retrieve information about.
     * @return {GetCountryRes} 200 - Successfully retrieved information about the specified country.
     */
    @Get('countries/{iso3}')
    @Security('AccessToken', ['admin'])
    @Security('RefreshToken', ['admin'])
    @Middlewares(cacheMiddleware(60 * 60 * 24 * 30))
    @OperationId('getCountry')
    public async getCountry(
        @Header(LANG_CODE_HEADER) lng: string = DEFAULT_LOCALE,
        @Path() iso3: string
    ): Promise<GetCountryRes> {
        const result = await this.directoryService.getCountry(lng, iso3);
        this.setStatus(200);
        return result;
    }
}