

import React from 'react';
export interface PaginationProps {
    _page: number;
    _totalPage: number;
    handleChangePage: (value: number) => void;
}

function PaginationComp({ _page, _totalPage, handleChangePage }: PaginationProps) {
    return (
        <>
            <ul className='flex flex-row justify-center min-w-fit bg-slate-200 rounded-lg'>
                {
                    new Array(_totalPage).fill(1).map((p, idx) => (
                        <li key={`list_pagination_${idx}`} className={`rounded-full  hover:cursor-pointer m-2 w-5 text-center ${idx === _page - 1 ? 'bg-slate-400' : 'bg-slate-600'}`} onClick={(e) => handleChangePage(idx + 1)}>{idx + 1}</li>

                    ))

                }

            </ul>
        </>

    );
}

export default PaginationComp;
