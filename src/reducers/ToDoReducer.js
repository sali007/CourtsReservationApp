import * as types from '../types'
import { List } from 'immutable';

const defaultState = new List();

export default function todoReducer(state = defaultState, action) {
    switch(action.type) {

        case types.GET_DEFAULT_DATE:
            return state.concat(action);

        case types.ADD_RESERVATION:
            return state.concat(action);

        case types.CONFIRM_RESERVATION:
            return state.concat(action);

        default:
            return state;
    }
}


