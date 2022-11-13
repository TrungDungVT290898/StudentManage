import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Student } from "../../models";
export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}
export interface IRankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}
export interface IDashboardState {
  loading: boolean;
  statistic: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: IRankingByCity[];
}
const initialState: IDashboardState = {
  loading: false,
  statistic: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};
const dashboardSlice = createSlice({
  name: "/dashboard",
  initialState: initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFail(state) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistic = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<IRankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});
//Actions
export const dashboardActions = dashboardSlice.actions;
//Selectors
export const selectDashboardStatistics = (state: RootState) =>
  state.dashboard.statistic;
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading as boolean;
export const selectHighestStudentList = (state: RootState) =>
  state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) =>
  state.dashboard.lowestStudentList;
export const selectRankingByCity = (state: RootState) =>
  state.dashboard.rankingByCityList as IRankingByCity[];
//Reducer
const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
