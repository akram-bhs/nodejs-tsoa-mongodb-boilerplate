import { Example } from 'tsoa';
import { ApiResponse, List } from './common.dto';

/**
 * Represents the response payload for retrieving a list of languages.
 * Extends the base ApiResponse class with a generic parameter of LanguagesData type.
 */
export class GetLanguagesRes extends ApiResponse<LanguagesData> { }

/**
 * Represents the data structure for languages.
 * Extends List with a generic parameter of LanguageInfo type.
 */
export class LanguagesData extends List<LanguageInfo> { }

/**
 * Represents information about a language.
 */
@Example({
    code: 'en',
    name: 'English'
})
export class LanguageInfo {
    /**
     * The code associated with the language.
     */
    code: string;

    /**
     * The name of the language.
     */
    name: string;
}

/**
 * Represents the response payload for retrieving a list of countries.
 * Extends the base ApiResponse class with a generic parameter of CountriesData type.
 */
export class GetCountriesRes extends ApiResponse<CountriesData> { }

/**
 * Represents the data structure for countries.
 * Extends List with a generic parameter of CountryInfo type.
 */
export class CountriesData extends List<CountryInfo> { }

/**
 * Represents information about a country.
 */
@Example({
    iso2: 'US',
    iso3: 'USA',
    name: 'United States'
})
export class CountryInfo {
    /**
     * The ISO 3166-1 alpha-2 code associated with the country.
     */
    iso2: string;

    /**
     * The ISO 3166-1 alpha-3 code associated with the country.
     */
    iso3: string;

    /**
     * The name of the country.
     */
    name: string;
}

/**
 * Represents the response payload for retrieving information about a country.
 * Extends the base ApiResponse class with a generic parameter of CountryData type.
 */
export class GetCountryRes extends ApiResponse<CountryData> { }

/**
 * Represents detailed information about a country.
 */
@Example({
    country: {
        iso2: 'US',
        iso3: 'USA',
        name: 'United States'
    },
    states: [
        {
            state: {
                id: 1,
                name: 'California'
            },
            cities: [
                {
                    id: 123,
                    name: 'Los Angeles'
                }
            ]
        }
    ]
})
export class CountryData {
    /**
     * Information about the country.
     */
    country: CountryInfo;

    /**
     * List of states within the country.
     */
    states: StateData[];
}

/**
 * Represents information about a state.
 */
export class StateData {
    /**
     * Information about the state.
     */
    state: StateInfo;

    /**
     * List of cities within the state.
     */
    cities: CityInfo[];
}

/**
 * Represents information about a state.
 */
export class StateInfo {
    /**
     * The unique identifier (ID) of the state.
     */
    id: number;

    /**
     * The name of the state.
     */
    name: string;
}

/**
 * Represents information about a city.
 */
export class CityInfo {
    /**
     * The unique identifier (ID) of the city.
     */
    id: number;

    /**
     * The name of the city.
     */
    name: string;
}

export class PropertyTypeInfo {
    code: string;
    name: string;
}

export class PropertySubTypeInfo {
    code: string;
    name: string;
}

export class ViewTypeInfo {
    code: string;
    name: string;
}

export class AmenityInfo {
    code: string;
    name: string;
}

export class CarMakeInfo {
    code: string;
    name: string;
}

export class CarModelInfo {
    code: string;
    name: string;
}

export class CarTypeInfo {
    code: string;
    name: string;
}

export class WatchBrandInfo {
    code: string;
    name: string;
}

export class WatchModelInfo {
    code: string;
    name: string;
}