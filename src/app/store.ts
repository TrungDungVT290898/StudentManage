import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import counterReducer from "../features/counter/counterSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import {
  createRouterMiddleware,
  createRouterReducer,
  ReduxRouterSelector,
  ReduxRouterState,
  ReduxRouterProps,
} from "@lagunovsky/redux-react-router";
import { history } from "../utils";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import studentReducer from "../features/student/studenSlice";
import citySlice from "../features/city/citySlice";

const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: combineReducers({
    counter: counterReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    navigator: createRouterReducer(history),
    student: studentReducer,
    city: citySlice,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware),
});
sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const routerSelector: ReduxRouterSelector<RootState> = (state) =>
  state.navigator as ReduxRouterState;
