import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './pages/LoginPage';
import { RootState } from '../../app/store';
import studentAPI from '../../api/studentAPI';
import { useNavigate } from 'react-router-dom';

export interface IAuthState {
    isLoggedIn: boolean;
    logging: boolean;
    currentUser?: User;
}
export interface ILoginPayLoad {
    username: string;
    password: string;
}
const initialState: IAuthState = {
    isLoggedIn: Boolean(localStorage.getItem('access_token')),
    logging: false,
    currentUser: undefined,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<ILoginPayLoad>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            state.logging = false;
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        loginFail(state, action: PayloadAction<string>) {
            state.logging = false;
            state.isLoggedIn = false;
            console.log(`login fail`, state.currentUser);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    },
});
export const authActions = authSlice.actions;

//selectors
export const selectLoggIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectAuthState = (state: RootState) => state.auth;
//reducer
const authReducer = authSlice.reducer;
export default authReducer;
