import { List } from 'immutable';

const defaultState = false;

export default function AuthReducer(state = defaultState, action) {
    switch(action.type) {
        case 'LOGIN':
            return action;
        case 'REGISTER':
            return action;
        case 'LOGOUT':
            return action;

        default:
            return state;
    }
}