import request from 'axios';

const URL = 'http://localhost:3001/reservation';
const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
let dataG;

export function nextDate(date) {
    request.post(URL, { date:date} ).then(response => {
        dataG =  response.data;
        //console.log(data);
    })
    return {
        type: 'NEXT_DATE',
        date: new Date(date).getDate() + 1,
        data: dataG
    };
}

export function previousDate(date) {
    request.post(URL, { date:date} ).then(response => {
        dataG =  response.data;
        //console.log(data);
    })
    return {
        type: 'PREVIOUS_DATE',
        date: new Date(date)
            .setDate(new Date(date).getDate() - 1),
    };
}


export function getDefaultDate(date) {

    //console.log(dataG);
    return {
        type: 'GET_DEFAULT_DATE',
        date: Date.now(),
        promise: request.post(URL, { date:date} ).then(response => {
            dataG =  response.data;
            //console.log(response);
        })
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

