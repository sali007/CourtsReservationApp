import React      from 'react';
import ReactDOM   from 'react-dom';

import { browserHistory, Router } from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from './middleware/promiseMiddleware'
import { Provider } from 'react-redux';
import * as reducers from './reducers/';
import { fromJS } from 'immutable';

import routes from './routes';


let initialState = window.__INITIAL_STATE__;

Object
    .keys(initialState)
    .forEach(key => {
            initialState[key] = fromJS(initialState[key])
    });

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
//const store = createStore(reducer, initialState);

const component = (
        <Provider store={store}>
           <Router children={routes} history={browserHistory}/>
        </Provider>
);

ReactDOM.render(component, document.getElementById('root'));
