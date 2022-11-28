import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';


import useAuth from '../../hooks/useAuth';
type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
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
