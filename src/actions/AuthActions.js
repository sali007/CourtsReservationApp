import request from 'axios';


const URL_LOGIN = 'http://localhost:3001/login';
const URL_REGISTER = 'http://localhost:3001/register';


export function register(data) {
    return {
        type: 'NEXT_DATE',
        date: d,
        promise: request.post(URL, { date:d} )
    };
}

export function login(data) {

    return {
        type: 'PREVIOUS_DATE',
        promise: request.post(URL, { date:d} ),
        date: d
    };
}



