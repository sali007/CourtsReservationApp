import React      from 'react';
import ReactDOM, { render }   from 'react-dom';

import { browserHistory, Router } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux';
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

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store);
//const reducer = combineReducers(reducers);
//const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
    // Prevent duplicate fetches when first loaded.
    // Explanation: On server-side render, we already have __INITIAL_STATE__
    // So when the client side onUpdate kicks in, we do not need to fetch twice.
    // We set it to null so that every subsequent client-side navigation will
    // still trigger a fetch data.
    // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
    if (window.__INITIAL_STATE__ !== null) {
        window.__INITIAL_STATE__ = null;
        return;
    }

    store.dispatch({ type: types.CREATE_REQUEST });
    fetchDataForRoute(this.state)
        .then((data) => {
            return store.dispatch({ type: types.REQUEST_SUCCESS, data });
        });
}

const component = (
        <Provider store={store}>
           <Router  history={browserHistory} onUpdate={onUpdate}>
               {routes}
           </Router>
        </Provider>
);

ReactDOM.render(component, document.getElementById('root'));
