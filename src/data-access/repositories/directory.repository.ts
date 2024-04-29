import { Model } from 'mongoose';
import { singleton } from 'tsyringe';
import DirectoryModel, { Directory } from '../models/directory.model';
import { CityInfo, CountryData, CountryInfo, LanguageInfo, StateInfo } from '../../dto/directory.dto';

@singleton()
export class DirectoryRepository {
    private readonly directoryModel: Model<Directory>;
    constructor() {
        this.directoryModel = DirectoryModel;
    }

    public async findLanguages(): Promise<LanguageInfo[]> {
        const foundLanguages: LanguageInfo[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'languages'
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    code: '$value.code',
                    name: '$value.name'
                }
            }
        ]);

        if (!foundLanguages || foundLanguages.length == 0) return [];
        return foundLanguages;
    }

    public async findCountries(lng: string): Promise<CountryInfo[]> {
        const foundCountries: CountryInfo[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'countries'
                }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $project: {
                    _id: 0,
                    iso2: '$value.iso2',
                    iso3: '$value.iso3',
                    name: { $cond: { if: { $gt: [`$value.name.translations.${lng}`, null] }, then: `$value.name.translations.${lng}`, else: '$value.name.default' } }
                }
            },
        ]);

        if (!foundCountries || foundCountries.length == 0) return [];
        return foundCountries;
    }

    public async findCountry(lng: string, iso3: string): Promise<CountryData | null> {
        const foundCountries: CountryData[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'countries'
                }
            },
            {
                $match: {
                    'value.iso3': iso3
                }
            },
            {
                $project: {
                    _id: 0,
                    country: {
                        iso2: '$value.iso2',
                        iso3: '$value.iso3',
                        name: { $cond: { if: { $gt: [`$value.name.translations.${lng}`, null] }, then: `$value.name.translations.${lng}`, else: '$value.name.default' } }
                    },
                    states: {
                        $map: {
                            input: '$value.states',
                            as: 'stateItem',
                            in: {
                                id: '$$stateItem.id',
                                name: { $cond: { if: { $gt: [`$$stateItem.name.translations.${lng}`, null] }, then: `$$stateItem.name.translations.${lng}`, else: '$$stateItem.name.default' } },
                                cities: {
                                    $map: {
                                        input: '$$stateItem.cities',
                                        as: 'cityItem',
                                        in: {
                                            id: '$$cityItem.id',
                                            name: { $cond: { if: { $gt: [`$$cityItem.name.translations.${lng}`, null] }, then: `$$cityItem.name.translations.${lng}`, else: '$$cityItem.name.default' } }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]);

        if (!foundCountries || foundCountries.length == 0) return null;
        return foundCountries[0];
    }

    public async findCountryByIso3(lng: string, iso3: string): Promise<CountryInfo | null> {
        const foundCountries: CountryInfo[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'countries'
                }
            },
            {
                $match: {
                    'value.iso3': iso3
                }
            },
            {
                $project: {
                    _id: 0,
                    iso2: '$value.iso2',
                    iso3: '$value.iso3',
                    name: { $cond: { if: { $gt: [`$value.name.translations.${lng}`, null] }, then: `$value.name.translations.${lng}`, else: '$value.name.default' } }
                }
            }
        ]);

        if (!foundCountries || foundCountries.length == 0) return null;
        return foundCountries[0];
    }

    public async findStateById(lng: string, countryCode: string, stateId: string): Promise<StateInfo | null> {
        const foundStates: StateInfo[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'countries'
                }
            },
            {
                $match: {
                    'value.iso3': countryCode
                }
            },
            {
                $unwind: {
                    path: '$value.states',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'value.states.id': stateId
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$value.states.id',
                    name: { $cond: { if: { $gt: [`$value.states.name.translations.${lng}`, null] }, then: `$value.states.name.translations.${lng}`, else: '$value.states.name.default' } }
                }
            }
        ]);

        if (!foundStates || foundStates.length == 0) return null;
        return foundStates[0];
    }

    public async findCityById(lng: string, countryCode: string, stateId: string, cityId: string): Promise<CityInfo | null> {
        const foundCities: CityInfo[] = await this.directoryModel.aggregate([
            {
                $match: {
                    key: 'countries'
                }
            },
            {
                $match: {
                    'value.iso3': countryCode
                }
            },
            {
                $unwind: {
                    path: '$value.states',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'value.states.id': stateId
                }
            },
            {
                $unwind: {
                    path: '$value.states.cities',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    'value.states.cities.id': cityId
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$value.states.cities.id',
                    name: { $cond: { if: { $gt: [`$value.states.cities.name.translations.${lng}`, null] }, then: `$value.states.cities.name.translations.${lng}`, else: '$value.states.cities.name.default' } }
                }
            }
        ]);

        if (!foundCities || foundCities.length == 0) return null;
        return foundCities[0];
    }
}