import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { City, ListResponse, Student } from '../../models';
export interface ICitySliceState {
  loading: boolean;
  cities: City[];
}
const initialState: ICitySliceState = {
  loading: false,
  cities: [],
};
const citiSlice = createSlice({
  name: 'citySlice',
  initialState: initialState,
  reducers: {
    fetchCities: state => {
      state.loading = true;
    },
    fetchCitiesSuccess: (state, action: PayloadAction<City[]>) => {
      state.cities = action.payload;
      console.log('cities:', state.cities);
    },
    fetchCitiesFail: state => {
      state.loading = false;
    },
  },
});
// selectors
export const loadingCity = (state: RootState) => state.city.loading as boolean;
export const selectCitiesList = (state: RootState) => state.city.cities as City[];
export const selectCitiesMap = createSelector(selectCitiesList, citiesList => {
  return citiesList.reduce((map: { [code: string]: City }, citi) => {
    map[citi.code] = citi;
    return map;
  }, {});
});
// actions
export const cityActions = citiSlice.actions;
// reducer
export default citiSlice.reducer;
