import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../models';

import useAuth from './useAuth';

type LoginHookProps = {
  loGin: (data: User) => Promise<void>;
  isAuthenticating: boolean;
};

function useLogin(): LoginHookProps {
  const { authActions, setLoginState } = useAuth();
  const { onLogin } = authActions;
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';
  const navigate = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const loGin = async (data: User) => {
    setIsAuthenticating(true);
    await onLogin(data, async () => {
      setIsAuthenticating(false);
      setLoginState?.(true, data);
      navigate(from);
    });
  };
  return { isAuthenticating, loGin };
}

export default useLogin;
