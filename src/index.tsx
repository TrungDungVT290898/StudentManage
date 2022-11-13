import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { routerSelector, store } from './app/store';
import { history } from './utils';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { CssBaseline } from '@mui/material';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxRouter history={history} routerSelector={routerSelector}>
        <App />
        <CssBaseline />
      </ReduxRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
