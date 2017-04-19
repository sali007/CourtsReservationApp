import { List } from 'immutable';

const defaultState = new List();

export default function AuthReducer(state = defaultState, action) {
    switch(action.type) {

        default:
            return state;
    }
}