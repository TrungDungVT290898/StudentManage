import { AuthActions } from '../contexts/AuthContext';
import { User } from '../models';

const useAuthActions: AuthActions = {
  onLogin: async (data: User, callbackfn?: () => void) => {
    window.localStorage.setItem('_tokenKey', '12312sdjgaiusd');
    window.localStorage.setItem('username', data.name);
    window.localStorage.setItem('password', data.password);
    await Promise.resolve(setTimeout(() => console.log(''), 1000)).then((s) => callbackfn?.());
  },

  onLogout: async (callbackfn?: () => void) => {
    window.localStorage.removeItem('_tokenKey');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('password');

    await Promise.resolve(setTimeout(() => console.log(''), 1000)).then((s) => callbackfn?.());
  },
};
export default useAuthActions;
