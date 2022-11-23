import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { routerSelector, store } from './app/store';
import { history } from './utils';
import App from './App';
import './index.css';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import './app/multiLanguage';
import { AuthProvider } from './contexts/AuthHook';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <Provider store={store}>
                <ReduxRouter history={history} routerSelector={routerSelector}>
                    <App />
                </ReduxRouter>
            </Provider>
        </AuthProvider>

    </React.StrictMode>,
);
