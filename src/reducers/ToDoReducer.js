import { List } from 'immutable';

const defaultState = new List();

export default function todoReducer(state = defaultState, action) {
    switch(action.type) {
        case 'NEXT_DATE':
            return state.concat(action.date);
        case 'PREVIOUS_DATE':
            return state.concat(action.date);

        case 'GET_DEFAULT_DATE':
            return state.concat(action.date);

        case 'CREATE_TODO':
            return state.concat(action.res.data.text);

        case 'EDIT_TODO':
            return state.set(action.id, action.text);
        case 'DELETE_TODO':
            return state.delete(action.id);

        default:
            return state;
    }
}

