interface SignInProps {
  keepLogin: boolean;
}

interface RootState {
  countries: {
    data: CountryData[];
  };
}

interface CountryData {
  flag: string;
  independent: boolean;
  name: string;
  region: string;
}

export type { SignInProps, RootState, CountryData };
