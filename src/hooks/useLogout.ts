import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';

type LoginHookProps = {
  logOut: () => Promise<void>;
  isLoggingOut: boolean;
};

function useLogout(): LoginHookProps {
  const { authActions, setLoginState } = useAuth();
  const { onLogout } = authActions;

  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logOut = async () => {
    console.log('Logging out....');
    setIsLoggingOut(true);
    await onLogout(async () => {
      setIsLoggingOut(false);
      setLoginState?.(false);
      navigate('/login');
    });
  };
  return { isLoggingOut, logOut };
}

export default useLogout;
