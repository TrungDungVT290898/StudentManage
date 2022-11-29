import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';
import studentAPI from '../../api/studentAPI';
import { ListParams, ListResponse, Student } from '../../models';
import { studentActions } from './studentSlice';
function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentAPI.getAll, action.payload);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('error when fetch student list:', error);
    yield put(studentActions.fetchStudentListFail());
  }
}
// function* handleSearchDebounce(action: PayloadAction<ListParams>) {
//   yield put(studentActions.setFilter(action.payload));
// }
export default function* studentSaga() {
  // watch fetch student action
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
  // yield debounce(500, studentActions.setFilterDebounce.type, handleSearchDebounce);
}
