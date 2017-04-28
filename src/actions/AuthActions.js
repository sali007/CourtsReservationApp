import request from 'axios';


const URL_LOGIN = 'http://localhost:3001/login';
const URL_REGISTER = 'http://localhost:3001/register';


export function register(data) {
    return {
        type: 'REGISTER',
        promise: request.post(URL_REGISTER, { data:data} )
    };
}

export function login(data) {

    return {
        type: 'LOGIN',
        promise: request.post(URL_LOGIN, { data:data} ),
    };
}



