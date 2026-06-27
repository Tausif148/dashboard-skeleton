// src/types/country-state-city.d.ts
declare module 'country-state-city' {
  interface ICountry {
    name: string;
    isoCode: string;
  }
  interface IState {
    name: string;
    isoCode: string;
  }
  interface ICity {
    name: string;
  }
  export const Country: {
    getAllCountries: () => ICountry[];
  };
  export const State: {
    getStatesOfCountry: (countryCode: string) => IState[];
  };
  export const City: {
    getCitiesOfState: (countryCode: string, stateCode: string) => ICity[];
  };
}