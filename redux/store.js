import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import loggerMiddleware from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';
import rootReducer, { initialState } from './reducer';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(
  rootReducer,
  initialState,
  bindMiddleware([apiMiddleware, sagaMiddleware, loggerMiddleware])
);

sagaMiddleware.run(rootSaga);

export default store;
