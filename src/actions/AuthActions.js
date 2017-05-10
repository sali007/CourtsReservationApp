import request from 'axios';
import URI


const URL_LOGIN = 'http://127.0.0.1:3001/login';
const URL_REGISTER = 'http://127.0.0.1:3001/signUp';
const URL_LOGOUT = 'http://127.0.0.1:3001/logout';


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



