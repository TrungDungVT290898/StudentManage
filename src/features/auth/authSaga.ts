import { PayloadAction } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { fork, take, call, delay, put } from "redux-saga/effects";
import axiosClient from "../../api/axiosClient";
import studentAPI from "../../api/studentAPI";
import { Student } from "../../models";
import { authActions, ILoginPayLoad } from "./authSlice";
import { User } from "./pages/LoginPage";
import { push } from "@lagunovsky/redux-react-router";
async function authenUser(info: ILoginPayLoad) {
  const data = await studentAPI.getByUserName({ name: info.username });
  return data[0];
}
function* handleLogin(info: ILoginPayLoad) {
  const isAuthen: Student = yield call(authenUser, info);
  //redirect to admin page
  if (isAuthen.name) {
    localStorage.setItem("access_token", "_1236gasd");
    yield put(authActions.loginSuccess(info));
    yield put(push("/admin/dashboard"));
  } else yield put(authActions.loginFail("user name or password incorrect!"));
}
function* handleLogout() {
  localStorage.removeItem("access_token");
  //redirect to login page
  yield put(push("/login"));
}
function* watchLoginFlow() {
  while (true) {
    const isLoggin = Boolean(localStorage.getItem("access_token"));
    if (!isLoggin) {
      const action: PayloadAction<ILoginPayLoad> = yield take(
        authActions.login.type
      );
      yield call(handleLogin, action.payload);
      continue;
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
