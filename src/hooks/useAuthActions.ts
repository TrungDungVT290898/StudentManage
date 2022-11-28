import { callbackify } from 'util';
import { AuthActions } from '../contexts/AuthContext';
import { User } from '../models';

const useAuthActions: AuthActions = {
  onLogin: async (data: User, callbackfn: () => void) => {
    window.localStorage.setItem('_tokenKey', '12312sdjgaiusd');
    window.localStorage.setItem('username', data.name);
    window.localStorage.setItem('password', data.password);
    new Promise((resolve) =>
      setTimeout(() => {
        callbackfn();
      }, 1000),
    );
  },

  onLogout: async (callbackfn: () => void) => {
    window.localStorage.removeItem('_tokenKey');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');

    new Promise((resolve) =>
      setTimeout(() => {
        callbackfn();
      }, 1000),
    );
  },
};
export default useAuthActions;
