import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import LoginPage from './features/auth/pages/LoginPage';
import AdminLayout from './components/layout/Admin';
import NotFound from './components/common/NotFound';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './features/dashboard';
import StudentFeature from './features/student';
import AddEditPage from './features/student/pages/AddEditPage';
import MainPage from './features/student/pages/MainPage';
import TLoginPage from './features/auth/pages/TLoginPage';

function App() {
    return (
        <>
            <Routes>
                {/* <Route element={<LoginPage />} path="/login"></Route> */}
                <Route element={<TLoginPage />} path="/login"></Route>
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="student" element={<StudentFeature />}>
                        <Route index element={<MainPage />} />
                        <Route path="*" element={<MainPage />} />
                        <Route path="add" element={<AddEditPage />} />
                        <Route path=":studentId" element={<AddEditPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />}></Route>
            </Routes></>

    );
}

export default App;
