import { Button, Divider, Grid } from '@mui/material'
import { makeStyles, styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks'
import { authActions } from '../../features/auth/authSlice';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';

interface IAdminProps {

}
const AdminLayout = (props: IAdminProps) => {
    const dispatch = useAppDispatch();
    const theme = useTheme();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Header />
                </Grid>
                <Divider />
                <Grid item xs={2} sx={{ borderRight: `1px solid ${theme.palette.divider}`, minHeight: "100vh" }}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10} sx={{ padding: "2 3" }}>
                    <Outlet />
                </Grid>

            </Grid>

        </>
    )
}

export default AdminLayout