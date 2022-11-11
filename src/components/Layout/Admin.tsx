import { Button } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { authActions } from '../../features/auth/authSlice';

interface IAdminProps {

}

const AdminLayout = (props: IAdminProps) => {
    const dispatch = useAppDispatch();
    return (
        <>
            <div className="col-12">
                <button className="btn btn-primary" onClick={() => dispatch(authActions.logout())}>LOG OUT</button>
            </div>

        </>
    )
}

export default AdminLayout