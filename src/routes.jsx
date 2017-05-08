import React from 'react';
import { IndexRoute, Route} from 'react-router';

import App from './components/App';
import LoginOrRegister from './components/LoginOrRegister'
import AdminLogin from './components/AdminLogin';

export default (store) => {
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
                pathname: '/admin'
            });
        }
        callback();
    };
    return (
        <Route path="/">
            <IndexRoute component={App}/>
            <Route path="login" component={AdminLogin} onEnter={redirectAuth}/>
            <Route path="admin" components={App} onEnter={requireAuth}/>
        </Route>
    );
};
