import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import cityAPI from './api/cityAPI';
import studentAPI from './api/studentAPI';
import { Route, Routes } from "react-router-dom"
import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './components/Layout/Admin';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './components/Common/PrivateRoute';
function App() {
  // useEffect(() => {
  //   // cityAPI.getAll().then(data => console.log(data));
  //   // studentAPI.getAll({ _page: 1, _limit: 50, _order: "desc", _sort: "" }).then(data => console.log(`student:`, data))
  //   // studentAPI.getByUserName({ name: "Ryan" }).then(dat => console.log(dat)).catch(err => console.log(err))
  // }, [])

  return (
    <div>
      <Routes>
        <Route element={<LoginPage />} path='/login'>

        </Route>
        <Route path='/admin' element={<PrivateRoute >
          <AdminLayout />
        </PrivateRoute>}>

        </Route>

        <Route path='*' element={<NotFound />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
