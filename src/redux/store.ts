import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "./countries";

export const store = configureStore({
  reducer: {
    countries: countrySlice,
  },
});
