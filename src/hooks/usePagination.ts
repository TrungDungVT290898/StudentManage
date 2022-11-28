import { useState } from 'react';

export interface PaginationProps {
  _totalPage: number;
  handleChangePage: (page: number) => void;
}
function usePagination({ _totalPage, handleChangePage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const gotoPage = (value: number) => {
    if (currentPage !== value) {
      if (value < 1) value = 1;
      else if (value > _totalPage) value = _totalPage;
      setCurrentPage((p) => value);
      handleChangePage(value);
    }

    //
  };
  return { currentPage, totalPage: _totalPage, gotoPage };
}

export default usePagination;
