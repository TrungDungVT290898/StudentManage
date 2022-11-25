import { Button, Divider, Grid } from '@mui/material';
import { makeStyles, styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { routerSelector } from '../../app/store';
import { authActions } from '../../features/auth/authSlice';
import { cityActions } from '../../features/city/citySlice';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const AdminLayout = () => {
    const router = useAppSelector(routerSelector);
    const path = router.location.pathname;
    const dispatch = useAppDispatch();

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    useEffect(() => {
        if (path.includes('dashboard')) setSelectedIndex((i) => (i = 0));
        else if (path.includes('student')) setSelectedIndex((i) => (i = 1));
        else setSelectedIndex((i) => (i = 2));
    }, [path]);
    useEffect(() => {
        dispatch(cityActions.fetchCities());
    }, [dispatch]);
    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        // setSelectedIndex(index);
    };
    const theme = useTheme();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Header />
                </Grid>
                <Divider />
                <Grid item xs={2} sx={{ borderRight: `1px solid ${theme.palette.divider}`, minHeight: '100vh' }}>
                    <Sidebar handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} />
                </Grid>
                <Grid item xs={10} sx={{ paddingLeft: 2, paddingRight: 2 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
};

export default AdminLayout;
