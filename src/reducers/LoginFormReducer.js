const defaultState = false;

export default function loginPageReducer(state = defaultState, action) {
    switch(action.type) {
        case 'LOGIN_FORM':
            return state;

        default:
            return state;
    }
}


