import { combineReducers } from 'redux';

import * as types from '../types'
import { List } from 'immutable';

const defaultState = false;

export default function AuthReducer(state = defaultState, action) {
    switch(action.type) {
        case types.LOGIN:
            return action;
        case types.REGISTER:
            return action;
        case types.LOGOUT:
            return action;

        default:
            return state;
    }
}