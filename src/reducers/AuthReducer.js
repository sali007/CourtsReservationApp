import { List } from 'immutable';

const defaultState = new List();

export default function AuthReducer(state = defaultState, action) {
    switch(action.type) {
        case 'LOGIN':
            return state.concat(action);
        case 'REGISTER':
            return state.concat(action);
        case 'LOGOUT':
            return state.concat(action);

        default:
            return state;
    }
}