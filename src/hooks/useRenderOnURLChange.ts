import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getListParamsFromLocation } from '../utils/common';
import { useEffect } from 'react';
import { selectStudentsFilter, studentActions } from '../features/student/studentSlice';

const useRenderOnURLChange = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectStudentsFilter);
  useEffect(() => {
    const filterFromURL = getListParamsFromLocation(location.search.replace('?', '').split('&'));
    dispatch(studentActions.setFilter(filterFromURL));
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
};

export default useRenderOnURLChange;
