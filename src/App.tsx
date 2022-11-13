import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './components/Layout/Admin';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';
import Dashboard from './features/dashboard';
import StudentFeature from './features/student';
import AddEditPage from './features/student/pages/AddEditPage';
import ListPage from './features/student/pages/ListPage';
function App() {
  return (

    <Routes>
      <Route element={<LoginPage />} path='/login'>

      </Route>
      <Route path='/admin' element={<PrivateRoute >
        <AdminLayout />

      </PrivateRoute>}>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/student" element={<StudentFeature />}>
          <Route index element={<ListPage />} />
          <Route path='*' element={<ListPage />} />
          <Route path='/admin/student/add' element={<AddEditPage />} />

        </Route>
      </Route>

      <Route path='*' element={<NotFound />}>

      </Route>
    </Routes>

  );
}

export default App;
