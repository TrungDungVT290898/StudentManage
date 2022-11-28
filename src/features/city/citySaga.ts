import { put, call, takeLatest } from 'redux-saga/effects';
import cityAPI from '../../api/cityAPI';
import { City, ListResponse } from '../../models';
import { cityActions } from './citySlice';
function* handleCitySaga() {
  // fetch city

  try {
    const { data: cityList }: ListResponse<City> = yield call(cityAPI.getAll);
    yield put(cityActions.fetchCitiesSuccess(cityList));
  } catch (error) {
    console.log('error when fetch cities:', error);
    yield put(cityActions.fetchCitiesFail());
  }
}
export function* citySaga() {
  yield takeLatest(cityActions.fetchCities.type, handleCitySaga);
}
