import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectStudentsFilter, selectStudentsList, selectStudentsLoading, selectStudentsPagination, studentActions } from '../studenSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider/Divider';
import StudentTable from '../components/StudentTable';
import { Student } from '../../../models';
import PaginationComp from '../components/Pagination';
import { routerSelector } from '../../../app/store';
import { push, go, replace } from "@lagunovsky/redux-react-router";
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/lab';
import { getListParamsFromLocation } from '../../../utils/common';
import LinearProgress from '@mui/material/LinearProgress';
import { citiesList, selectCitiesMap } from '../../city/citySlice';
function ListPage() {
    // const cities = useAppSelector(citiesList);
    const dispatch = useAppDispatch();
    const router = useAppSelector(routerSelector);
    const navigate = useNavigate();
    const students = useAppSelector(selectStudentsList);
    const pagination = useAppSelector(selectStudentsPagination);
    const filter = useAppSelector(selectStudentsFilter);
    const loading = useAppSelector(selectStudentsLoading);
    const citiMap = useAppSelector(selectCitiesMap);
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(studentActions.setFilter({ ...filter, _page: value }));
        navigate(`${router.location.pathname}?_page=${value}`)
        //

    }
    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch, filter])
    useEffect(() => {
        const queries = router.location.search.substring(1).split("&");
        const page = getListParamsFromLocation(queries);
        console.log("page: ", page)
        dispatch(studentActions.setFilter({ ...filter, _page: page?._page }));
    }, [router.location.search])

    return (
        <>
            {loading ? (<LinearProgress color="secondary" />
            ) : (<Card sx={{ width: "100%", height: "100%" }}>
                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    STUDENTS
                    <Button variant="contained">ADD NEW STUDENT</Button>
                </CardContent>

                <Divider />
                <CardContent>
                    <StudentTable students={students} citiesMap={citiMap} />
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", bottom: 10 }}>
                    <PaginationComp _page={pagination._page} _totalPage={Math.ceil(pagination._totalRows / pagination._limit)} handleChangePage={handleChangePage} />
                </CardActions>
            </Card>)}
        </>

    )
}

export default ListPage