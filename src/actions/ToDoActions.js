import request from 'axios';


const URL = 'http://localhost:3001/reservation';
const ADD_RESERVATION_URL = 'http://localhost:3001/addReservation';


export function nextDate(date) {
    let d = new Date(date)
        .setDate(new Date(date).getDate() + 1)
    return {
        type: 'NEXT_DATE',
        date: d,
        promise: request.post(URL, { date:d} )
    };
}

export function previousDate(date) {
    let d = new Date(date)
            .setDate(new Date(date).getDate() - 1);
    return {
        type: 'PREVIOUS_DATE',
        promise: request.post(URL, { date:d} ),
        date: d
    };
}

export function getDefaultDate(date) {
    return {
        type: 'GET_DEFAULT_DATE',
        date: date,
        promise:request.post(URL, { date:date} )
    }
}

export function addReserve(id, date, court, userName, userPhone, hour, summ, status) {
    return {
        type: 'ADD_RESERVATION',
        date: date,
        promise: request.post( ADD_RESERVATION_URL,
            {
               id:id,
               date: date,
               court:court,
               userInfo: userName,
               userPhone: userPhone,
               summ: summ,
               hour: hour,
               status: status
            })
    }
}

