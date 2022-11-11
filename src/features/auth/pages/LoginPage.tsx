import React, { useState } from 'react'
import { FormProvider, FTextField } from '../../../components/form/index'
import { useNavigate, useLocation } from "react-router-dom"
// import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form"
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { authActions, selectLoggIn } from '../authSlice';
import { useAppSelector } from '../../../app/hooks';

export type User = {
    username: string,
    password: string
}
const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
});
const defaultValues: User = {
    username: "",
    password: ""
};
function LoginPage() {
    let navigate = useNavigate();
    let location = useLocation();
    const dispatch = useDispatch();
    const isLogin = useAppSelector(selectLoggIn);
    const methods = useForm({

        defaultValues
    });
    const { handleSubmit } = methods;

    const onSubmit = async (data: User) => {
        if (!isLogin)
            dispatch(authActions.login({
                username: data.username,
                password: data.password
            }))
        else
            dispatch(authActions.logout())

    };

    return (
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", color: "black",
            height: "100vm", position: "absolute", width: "100%", top: "30%"
        }}>
            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods} >
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Username</label>
                    <FTextField className=".form-control-lg" name="username" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">Password</label>
                    <FTextField className=".form-control-lg" name="password" type="password" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div style={{ height: 30 }}></div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">{isLogin ? "LOG OUT" : "LOG IN"}</button>
                </div>

            </FormProvider>
        </div>

    )
}

export default LoginPage