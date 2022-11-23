import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthHook'



function useAuth() {
    return useContext(AuthContext);
}

export default useAuth