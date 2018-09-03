import '../styles/styles.scss'
import '../styles/functions.scss'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reducers from './reducers';

const middleware = applyMiddleware(reduxPromise);
const createStoreWithMiddleware = process.env.NODE_ENV == 'production' ? middleware(createStore):composeWithDevTools(middleware)(createStore)

render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory} routes={routes} />
        
    </Provider>
    , document.querySelector('#chiaUI'));
