import { CountryModel } from './country.model';

export interface LanguageModel {
    name: string;
    code: string;
    country: CountryModel;
}
