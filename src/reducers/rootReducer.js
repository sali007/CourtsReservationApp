import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as types from '../types';

import todoss from './ToDoReducer';
import user from './AuthReducer';
import loginPage from './LoginPageReducer';
import message from './message'


const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.CREATE_REQUEST:
            return true;
        case types.REQUEST_SUCCESS:
        case types.REQUEST_FAILURE:
            return false;
        default:
            return state;
    }
};

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
    isFetching,
    todoss,
    user,
    loginPage,
    routing,
    message
});

export default rootReducer;
