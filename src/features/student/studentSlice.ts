import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ListParams, ListResponse, PaginationParams, Student } from '../../models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter?: ListParams;
  pagination: PaginationParams;
}
const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _limit: 15,
    _page: 1,
    _totalRows: 15,
  },
};
const studentSlice = createSlice({
  name: 'studen',
  initialState: initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFail(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterDebounce(state, action: PayloadAction<ListParams>) {
      console.log('debounce filter');
    },
  },
});

// Action
export const studentActions = studentSlice.actions;
// Selectors
export const selectStudentsList = (state: RootState) => state.student.list as Student[];
export const selectStudentsLoading = (state: RootState) => state.student.loading as boolean;

export const selectStudentsFilter = (state: RootState) => state.student.filter as ListParams;

export const selectStudentsPagination = (state: RootState) => state.student.pagination as PaginationParams;

// Reducer
const studentReducer = studentSlice.reducer;

export default studentReducer;
