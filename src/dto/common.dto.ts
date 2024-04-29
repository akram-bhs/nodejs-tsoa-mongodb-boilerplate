import { IsNotEmpty } from 'class-validator';
import { Example } from 'tsoa';

/**
 * Represents the structure of an API response.
 * @template T - The type of the data in the response.
 */
export class ApiResponse<T> {
    /**
     * The data in the response, if any.
     */
    data?: T | null;

    /**
     * An array of errors in the response.
     */
    errors?: Error[];

    /**
     * An array of warnings in the response.
     */
    warnings?: Warning[];
}

/**
 * Represents an error in the API response.
 */
export class Error {
    /**
     * The error code.
     */
    code: string;

    /**
     * The error message.
     */
    message: string;
}

/**
 * Represents a warning in the API response.
 */
export class Warning {
    /**
     * The warning code.
     */
    code: string;

    /**
     * The warning message.
     */
    message: string;
}

/**
 * Represents a paginated list containing items of type T.
 * @template T - The type of items in the list.
 */
export class PaginatedList<T> {
    /**
     * An array of items.
     */
    items: T[];

    /**
     * The pagination information.
     */
    pagination: Pagination;
}

/**
 * Represents pagination details.
 */
export class Pagination {
    /**
     * The current page number.
     */
    page: number;

    /**
     * The number of items per page.
     */
    pageSize: number;

    /**
     * The total number of pages.
     */
    pageCount: number;

    /**
     * The total number of items across all pages.
     */
    totalCount: number;
}

/**
 * Represents a list containing items of type T.
 * @template T - The type of items in the list.
 */
export class List<T> {
    /**
     * An array of items.
     */
    items: T[];
}

/**
 * Represents a success response.
 */
@Example({
    success: true
})
export class Success {
    /**
     * Indicates whether the operation was successful.
     */
    success: boolean;
}

/**
 * Represents a resource with a URL.
 */
@Example({
    url: 'https://example.com/file.jpg'
})
export class Resource {
    /**
     * The URL of the resource.
     */
    url: string;
}

/**
 * Represents multilingual content with a default value and optional translations.
 */
export class MultilingualContent {
    /**
     * The default content.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    default: string;

    /**
     * Optional translations for different languages.
     */
    translations?: Translations;
}

/**
 * Represents translations for different languages.
 */
export class Translations {
    /**
     * Translation for French language.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    fr: string;

    /**
     * Translation for German language.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    de: string;

    /**
     * Translation for Italian language.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    it: string;

    /**
     * Translation for Spanish language.
     */
    @IsNotEmpty({ message: 'RequiredFields' })
    es: string;
}