import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CountryData } from "@/types/common.t";

export interface CountriesData {
  data: CountryData[];
}

const initialState: CountriesData = {
  data: [],
};

const countrySlice = createSlice({
  name: "Countries",
  initialState,
  reducers: {
    addCountryData: (state, action: PayloadAction<CountryData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { addCountryData } = countrySlice.actions;
export default countrySlice.reducer;
