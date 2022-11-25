import { Pagination } from '@mui/material';
import React from 'react';
export interface PaginationProps {
    _page: number;
    _totalPage: number;
    handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function PaginationComp({ _page, _totalPage, handleChangePage }: PaginationProps) {
    return (
        <Pagination
            count={_totalPage}
            color="secondary"
            page={_page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
        />
    );
}

export default PaginationComp;
