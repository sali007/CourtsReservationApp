import request from 'axios';


const URL_LOGIN = '/login';
const URL_REGISTER = '/signUp';
const URL_LOGOUT = '/logout';


export function register(data) {
    return {
        type: 'REGISTER',
        promise: request.post(URL_REGISTER,
            { email:data.email,
              password: data.password
            }
            )
    };
}

export function login(data) {

    return {
        type: 'LOGIN',
        promise: request.post(URL_LOGIN, {
            email: data.email,
            password: data.password} ),
    };
}

export function logout() {
    return {
        type: 'LOGOUT',
        promise: request.post(URL_LOGOUT)
    }
}



