
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

                        idx === _page - 1 ?
                            (<li className='rounded-full bg-slate-400 hover:cursor-pointer m-2 w-5 text-center' onClick={(e) => handleChangePage(idx + 1)}>{idx + 1}</li>) :
                            (<li className='rounded-full bg-slate-700 hover:cursor-pointer hover:bg-slate-500 m-2 w-5 text-center' onClick={(e) => handleChangePage(idx + 1)}>{idx + 1}</li>)

                    ))

                }

            </ul>
            {/* <Pagination
                count={_totalPage}
                color="secondary"
                page={_page}
                onChange={handleChangePage}
                showFirstButton
                showLastButton
            /> */}
        </>

    );
}

export default PaginationComp;
