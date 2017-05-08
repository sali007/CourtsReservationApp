import * as types from '../types'

const defaultState = false;

export default function loginPageReducer(state = defaultState, action) {
    switch(action.type) {
        case types.LOGIN_PAGE:
            return action;

        default:
            return state;
    }
}


