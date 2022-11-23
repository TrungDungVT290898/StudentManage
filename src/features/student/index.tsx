import React from 'react';
import { Outlet, Route, Routes, NavLink } from 'react-router-dom';
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
