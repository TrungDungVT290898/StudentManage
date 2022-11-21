import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet, Route, Routes } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

function StudentFeature() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default StudentFeature;
