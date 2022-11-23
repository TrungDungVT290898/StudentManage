import React, { useEffect } from 'react';
import { Navigate, RouteProps, Route, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import authReducer, { selectAuthState, selectLoggIn } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';
type IPrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: IPrivateRouteProps) {
  // check if user is logged in
  // if yes, show route
  // otherwise,redirect login page
  const location = useLocation();
  const { isLogged } = useAuth();
  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
