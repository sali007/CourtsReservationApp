const defaultState = false;

export default function loginPageReducer(state = defaultState, action) {
    switch(action.type) {
        case 'LOGIN_PAGE':
            return action;

        default:
            return state;
    }
}


