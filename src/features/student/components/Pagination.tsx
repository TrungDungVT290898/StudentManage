import { Pagination } from '@mui/material';
import React from 'react'
export interface IPaginationProps {
    _page: number,
    _totalPage: number,
    handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function PaginationComp({ _page, _totalPage, handleChangePage }: IPaginationProps) {
    return (
        <Pagination count={_totalPage} color="secondary" page={_page} onChange={handleChangePage} showFirstButton showLastButton />
    )
}

export default PaginationComp