import { List } from 'immutable';

const defaultState = new List();

export default function todoReducer(state = defaultState, action) {
    switch(action.type) {
        case 'NEXT_DATE':
            return state.concat(action);
        case 'PREVIOUS_DATE':
            return state.concat(action);

        case 'GET_DEFAULT_DATE':
            return state.concat(action);

        case 'ADD_RESERVATION':
            return state.concat(action);
        default:
            return state;
    }
}

