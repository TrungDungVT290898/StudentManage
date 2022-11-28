import React, { createContext, useState, useEffect } from 'react'

import useAuthActions from '../hooks/useAuthActions';
import { User } from '../models';


export interface AuthContextState {
    user?: User,
    isLogged: boolean,
    setLoginState?: (value: boolean) => void;
    authActions: AuthActions
}
export interface AuthActions {
    onLogin: (data: User, callbackfn: () => void) => Promise<void>,
    onLogout: (callbackfn: () => Promise<void>) => Promise<void>
}
export interface AuthProviderProps {
    children: JSX.Element,
    authActions: AuthActions
}
const defaultValue: AuthContextState = {
    isLogged: false,
    user: {
        name: '',
        password: ''
    },
    authActions: useAuthActions
}
const AuthContext = createContext(defaultValue);

function AuthProvider({ children, authActions }: AuthProviderProps) {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const setLoginState = (value: boolean) => {
        setIsLogged(value);
    }
    useEffect(() => {
        if (window.localStorage.getItem('_tokenKey')) {
            setIsLogged(true);
        }

    }, [])


    return (
        <AuthContext.Provider value={{ user, authActions, isLogged, setLoginState }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }