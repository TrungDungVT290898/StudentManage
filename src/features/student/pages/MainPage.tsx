import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
    selectStudentsFilter,
    selectStudentsList,
    selectStudentsLoading,
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

import { useLocation, NavLink } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { selectCitiesList, selectCitiesMap } from '../../city/citySlice';
import StudentFilter from '../components/StudentFilter';
import { history } from '../../../utils';
import usePagination from '../../../hooks/usePagination';
// import { getSearchStringFromListParams } from '../../../utils/common';
import useSearch from '../../../hooks/useSearch';
import useRenderOnURLChange from '../../../hooks/useRenderOnURLChange';
import useUpdateParams from '../../../hooks/useUpdateParams';

import studentAPI from '../../../api/studentAPI';




function MainPage() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectStudentsLoading);
    const cityMap = useAppSelector(selectCitiesMap);
    const cityList = useAppSelector(selectCitiesList);
    const location = useLocation();
    const students = useAppSelector(selectStudentsList);
    const filter = useAppSelector(selectStudentsFilter);
    useRenderOnURLChange();
    const { setSearchValue } = useSearch();
    const { updateCustomParams } = useUpdateParams();
    const pagination = usePagination();
    const onChangeFilter = (newFilters: ListParams) => {
        updateCustomParams(newFilters);
    };

    const onSearchChangeFilter = (value: string) => {
        setSearchValue(value);
    };
    const handleStudentRemove = async (student: Student) => {
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

    return (
        <React.Fragment>
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
                            citiesMap={cityMap}
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
                            _page={pagination.currentPage}
                            _totalPage={pagination.totalPage}
                            handleChangePage={pagination.gotoPage}
                        />
                    </CardActions>


                </Card>
            )}
        </React.Fragment>
    );
}

export default MainPage;
