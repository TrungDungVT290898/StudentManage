import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../features/auth/pages/LoginPage';
import studentAPI from '../api/studentAPI';
import { Student } from '../models';
export interface AuthHookState {
    user?: User,
    isLogged: boolean,
    onLogin?: (data: User, callbackfn: () => void) => void,
    onLogout?: (callbackfn: () => void) => void
}
export interface AuthHookProps {
    children: JSX.Element
}
const defaultValue: AuthHookState = {
    isLogged: false,
    user: {
        username: '',
        password: ''
    }
}
const AuthContext = createContext(defaultValue);

function AuthProvider({ children }: AuthHookProps) {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    useEffect(() => {
        if (window.localStorage.getItem('_tokenKey')) {
            setUser(
                {
                    username: window.localStorage.getItem('username')!,
                    password: window.localStorage.getItem('password')!
                }

            );
            setIsLogged(true);
        }

    }, [])

    const onLogin = async (data: User, callbackfn: () => void) => {
        console.log('onlogin....')
        window.localStorage.setItem('_tokenKey', '12312sdjgaiusd');
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('password', data.password);
        setUser(s => data);
        setIsLogged(s => true);

        callbackfn();

    };
    const onLogout = (callbackfn: () => void) => {

        window.localStorage.removeItem('_tokenKey');
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        setUser(s => (undefined));
        setIsLogged(s => false);
        callbackfn();
    }
    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout, isLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }