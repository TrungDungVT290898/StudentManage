import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    selectStudentsFilter,
    selectStudentsList,
    selectStudentsLoading,
    selectStudentsPagination,
    studentActions,
} from '../studentSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider/Divider';
import StudentTable from '../components/StudentTable';
import { ListParams, Student } from '../../../models';
import PaginationComp from '../../../components/common/Pagination';
import { routerSelector } from '../../../app/store';

import { useLocation, NavLink } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import { selectCitiesList, selectCitiesMap } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import studentAPI from '../../../api/studentAPI';
import { history } from '../../../utils';
function ListPage() {
    const dispatch = useAppDispatch();
    const router = useAppSelector(routerSelector);
    const students = useAppSelector(selectStudentsList);
    const pagination = useAppSelector(selectStudentsPagination);
    const filter = useAppSelector(selectStudentsFilter);
    const loading = useAppSelector(selectStudentsLoading);
    const citiMap = useAppSelector(selectCitiesMap);
    const cityList = useAppSelector(selectCitiesList);
    const location = useLocation();
    const onChangeFilter = (newFilters: ListParams) => {
        dispatch(studentActions.setFilter(newFilters));
    };
    const onSearchChangeFilter = (newFilters: ListParams) => {
        dispatch(studentActions.setFilterDebounce(newFilters));
    };
    const handleChangePage = (value: number) => {
        dispatch(studentActions.setFilter({ ...filter, _page: value }));

        //
    };
    const handleStudentRemove = async (student: Student) => {
        console.log(student);
        try {
            // call api to remove student from db
            await studentAPI.remove(student.id!);
            // keep all filters
            dispatch(studentActions.fetchStudentList(filter));
        } catch (error) {
            console.log('error when remove student', error);
        }
    };
    const handleStudentEdit = async (studentId: string) => {
        history.push(`${location.pathname}/${studentId}`);
    };
    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
        let newURL = `${router.location.pathname}?`;
        if (filter._page) {
            newURL += `&_page=${filter._page!}`;
        }
        if (filter._order) {
            newURL += `&_order=${filter._order!}`;
        }
        if (filter._sort) {
            newURL += `&_sort=${filter._sort!}`;
        }
        if (filter._limit) {
            newURL += `&_limit=${filter._limit!}`;
        }

        if (filter['city']) {
            newURL += `&city=${filter['city']!}`;
        }
        history.push(newURL);
    }, [dispatch, filter]);

    return (
        <>
            {loading ? (
                <LinearProgress color="secondary" />
            ) : (
                <Card sx={{ width: '100%', height: '100%' }}>
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        STUDENTS
                        <Button variant="contained">
                            <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`${location.pathname}/add`}>
                                ADD NEW STUDENT
                            </NavLink>
                        </Button>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <StudentFilter
                            filter={filter}
                            onChange={onChangeFilter}
                            onSearchChange={onSearchChangeFilter}
                            cityList={cityList}
                        />
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <StudentTable
                            students={students}
                            citiesMap={citiMap}
                            onEdit={handleStudentEdit}
                            onRemove={handleStudentRemove}
                        />
                    </CardContent>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            bottom: 10,
                        }}
                    >
                        <PaginationComp
                            _page={pagination?._page}
                            _totalPage={Math.ceil(pagination?._totalRows / pagination?._limit)}
                            handleChangePage={handleChangePage}
                        />
                    </CardActions>
                </Card>
            )}
        </>
    );
}

export default ListPage;
