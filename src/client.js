import React      from 'react';
import ReactDOM, { render }   from 'react-dom';

import { browserHistory, Router } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware/promiseMiddleware'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux';
import * as reducers from './reducers/';
import configureStore from './store/configureStore';
import { fromJS } from 'immutable';
import * as types from './types';
import createRoutes from './routes';
import fetchDataForRoute from './utils/fetchDataForRoute';

let initialState = window.__INITIAL_STATE__;

Object
    .keys(initialState)
    .forEach(key => {
            initialState[key] = fromJS(initialState[key])
    });

//const store = createStore(initialState, browserHistory);
//const history = syncHistoryWithStore(browserHistory, store)
//const initRoutes = routes(store);
const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

const component = (
        <Provider store={store}>
           <Router  children={createRoutes} history={browserHistory}>
           </Router>
        </Provider>
);

ReactDOM.render(component, document.getElementById('root'));
