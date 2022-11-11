import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom"
import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './components/Layout/Admin';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';
import Dashboard from './features/dashboard';
import Student from './features/student';
function App() {
  return (

    <Routes>
      <Route element={<LoginPage />} path='/login'>

      </Route>
      <Route path='/admin' element={<PrivateRoute >
        <AdminLayout />

      </PrivateRoute>}>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/student" element={<Student />}></Route>
      </Route>

      <Route path='*' element={<NotFound />}>

      </Route>
    </Routes>

  );
}

export default App;
