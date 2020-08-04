import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

// REDUX IMPORTS
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Reducer from './reducer';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

// CREATE STORE
// const createStoreWithMiddleware = applyMiddleware(
//   promiseMiddleware,
//   ReduxThunk
// )(createStore);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Reducer,
  composeEnhancers(applyMiddleware(promiseMiddleware, ReduxThunk))
);

ReactDOM.render(
  <Provider
    store={store}
    // store={createStoreWithMiddleware(
    //   Reducer,
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // )}
  >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
