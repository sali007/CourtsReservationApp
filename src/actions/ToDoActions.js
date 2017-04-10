import request from 'axios';

request.defaults.port = 3001;

const URL = 'reservation';
const URL_ADD = 'add_reserv';
const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';


export function nextDate(date) {
    return {
        type: 'NEXT_DATE',
        date: new Date(date)
            .setDate(new Date(date).getDate() + 1),
        promise: request.post(URL, { date })
    };
}

export function previousDate(date) {
    return {
        type: 'PREVIOUS_DATE',
        date: new Date(date)
            .setDate(new Date(date).getDate() - 1),
        promise: request.post(URL, { date })
    };
}


export function getDefaultDate(date) {
    return {
        type: 'GET_DEFAULT_DATE',
        date: Date.now(),
        promise: request.post(URL, { date })
    }
}

export function createTodo(text) {
    return {
        type: 'CREATE_TODO',
        promise: request.post(BACKEND_URL, { text })
    }
}

export function editTodo(id, text) {
    return {
        type: 'EDIT_TODO',
        id,
        text,
        date: Date.now()
    };
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id
    };
}

