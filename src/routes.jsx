import React, { Component, PropTypes } from 'react';
import { IndexRoute, Route} from 'react-router';

import App from './components/App';


export default (
        <Route path="/">
            <IndexRoute component={App} />
            <Route path="admin" component={App} />
        </Route>
)

/*export default (store) => {
    const requireAuth = (nextState, replace, callback) => {
        const {user: {authenticated}} = store.getState();
        if (!authenticated) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            });
        }
        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const {user: {authenticated}} = store.getState();
        if (authenticated) {
            replace({
                pathname: '/'
            });
        }
        callback();
    };
    return (
        <Route path="/">
            <IndexRoute component={App}/>
            <Route path="admin" component={App}/>
        </Route>
    );
};*/
