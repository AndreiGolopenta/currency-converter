export interface Country {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  area: number;
  borders: string[];
  callingCodes: string[];
  capital: string;
  cioc: string;
  currencies: Currencies[];
  demonym: string;
  flag: string;
  gini: number;
  languages: Languages[];
  latlng: number[];
  name: string;
  nativeName: string;
  numericCode: string;
  population: number;
  region: string;
  regionalBlocs: any;
  subregion: string;
  timezones: string[];
  topLevelDomain: string[];
  translations: Translations;
}

interface Currencies {
  code: string;
  name: string;
  symbol: string;
}

interface Languages {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Translations {
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
}
