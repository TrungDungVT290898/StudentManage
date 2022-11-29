import { useAppSelector } from '../app/hooks';

import { selectStudentsPagination } from '../features/student/studentSlice';
import useUpdateParams from './useUpdateParams';

function usePagination() {
  const studentPagination = useAppSelector(selectStudentsPagination);
  const { updatePageParam } = useUpdateParams();
  const totalPage = Math.ceil(studentPagination._totalRows / studentPagination._limit);
  const gotoPage = (value: number) => {
    if (studentPagination._page !== value) {
      if (value < 1) value = 1;
      else if (value > totalPage) value = totalPage;

      updatePageParam(value);
    }

    //
  };
  return { currentPage: studentPagination._page, totalPage, gotoPage };
}

export default usePagination;
