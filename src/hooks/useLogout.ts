import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../models';

import useAuth from './useAuth';

type LoginHookProps = {
  logOut: () => Promise<void>;
  isAuthenticating: boolean;
};

function useLogout(): LoginHookProps {
  const { authActions, setLoginState } = useAuth();
  const { onLogout } = authActions;

  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const logOut = async () => {
    console.log('Logging out....');
    setIsAuthenticating(true);
    await onLogout(async () => {
      setIsAuthenticating(false);
      setLoginState?.(false);
      navigate('/login');
    });
  };
  return { isAuthenticating, logOut };
}

export default useLogout;
