import { takeLatest, all, call, put } from 'redux-saga/effects';
import cityAPI from '../../api/cityAPI';
import studentAPI from '../../api/studentAPI';
import { City, ListResponse, Student } from '../../models';
import { dashboardActions, IRankingByCity } from './dashboardSlice';
function* fetchStatistic() {
    const responseList: ListResponse<Student>[] = yield all([
        call(studentAPI.getAll, {
            _page: 1,
            _limit: 1,
            gender: 'male',
        }),
        call(studentAPI.getAll, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentAPI.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
        call(studentAPI.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
    ]);

    const statisticsList = responseList.map((x) => {
        return x.pagination._totalRows;
    });
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
    yield put(
        dashboardActions.setStatistics({
            maleCount,
            femaleCount,
            highMarkCount,
            lowMarkCount,
        }),
    );
}
function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentAPI.getAll, {
        _page: 1,
        _limit: 5,
        _order: 'desc',
        _sort: 'mark',
    });
    yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentAPI.getAll, {
        _page: 1,
        _limit: 5,
        _order: 'asc',
        _sort: 'mark',
    });
    yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCity() {
    //fetch city
    const { data: cityList }: ListResponse<City> = yield call(cityAPI.getAll);
    //fetch ranking per city
    const callList = cityList.map((city) =>
        call(studentAPI.getAll, {
            _page: 1,
            _limit: 5,
            _sort: 'mark',
            _order: 'desc',
            city: city.code,
        }),
    );
    const responseList: ListResponse<Student>[] = yield all(callList);
    //map to ranking by city list
    const rankingByCityList: IRankingByCity[] = responseList.map((x, idx) => ({
        cityId: cityList[idx].code,
        cityName: cityList[idx].name,
        rankingList: x.data,
    }));
    //update state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistic),
            call(fetchHighestStudentList),
            call(fetchLowestStudentList),
            call(fetchRankingByCity),
        ]);
        yield put(dashboardActions.fetchDataSuccess());
    } catch (error) {
        yield put(dashboardActions.fetchDataFail());
    }
}
export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
