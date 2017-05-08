import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware'
import { createLogger } from 'redux-logger';
import * as reducers from '../reducers/';
//import rootReducer from '../reducers/rootReducer';
import { routerReducer as routing } from 'react-router-redux';


/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
    // Installs hooks that always keep react-router and redux store in sync
    const middleware = [thunk, routerMiddleware(history) ];
    //let store;

    /*if (isClient && isDebug) {
        middleware.push(createLogger());
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(...middleware),
            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        ));*/
   // } else {
   /*     const reducer = combineReducers(reducers);
    middleware.push(createLogger());
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware),
        typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    ))*/

        //store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), f => f));
    const reducer = combineReducers(reducers);
    const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

    // }

    /*if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('reducers', () => {
            const nextReducer = require('../reducers');

            store.replaceReducer(nextReducer);
        });
    }*/

    return store;
}
