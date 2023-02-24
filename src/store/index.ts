import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from '@redux-saga/core';

import appSlice from './slices/appSlice';
import layoutSlice from './slices/layoutSlice';
import authSlice from './slices/authSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    app: appSlice,
    layout: layoutSlice,
    auth: authSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history))
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
