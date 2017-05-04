const defaultState = false;

export default function loginFormReducer(state = defaultState, action) {
    switch(action.type) {
        case 'LOGIN_FORM':
            return state;

        default:
            return state;
    }
}


