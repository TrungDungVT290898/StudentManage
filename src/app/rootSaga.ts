import { all } from 'redux-saga/effects';

import { citySaga } from '../features/city/citySaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import studentSaga from '../features/student/studentSaga';
export default function* rootSaga() {
  yield all([dashboardSaga(), studentSaga(), citySaga()]);
}
