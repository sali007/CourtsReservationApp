import request from 'axios';
import { push } from 'react-router-redux';
import { universalService } from '../service';

import * as types from '../types';


const URL = 'http://127.0.0.1:3001/reservation';
const ADD_RESERVATION_URL = 'http://127.0.0.1:3001/addReservation';


function Date(date, data) {
    return {
        type: types.GET_DEFAULT_DATE,
        date: date,
        data: data
    }
}

function Reserve(date, data) {
    return {
        type: types.ADD_RESERVATION,
        date: date,
        data: data
    }
}

function Confirmed() {
    return {
        type: type.CONFIRM_RESERVATION,
        data: data
    }
}

export function confirmReserve() {

}

export function addReserve(id, date, court, username, userPhone, hour, summ, status) {
    console.log('COurt number', court)
    let reservation = {
        id:id,
        date: date,
        court:court,
        userInfo: username,
        userPhone: userPhone,
        summ: summ,
        hour: hour,
        status: status
    };
    return (dispatch, getState) => {
        return universalService().addReserve({
            id:id,
            date: date,
            court:court,
            userInfo: username,
            userPhone: userPhone,
            summ: summ,
            hour: hour,
            status: status
        }).then((res) => {
            console.log('response of addReserve', res.status == 200)
            if (res.status == 200) {
                dispatch(Reserve(date,res.data))
            }
        })
            .catch(() => {
                console.log({ date, error: 'Oops! Something went wrong and we couldn\'t add reservation'});
            });
    }
}

export function getDefaultDate(date) {
    return (dispatch, getState) => {

        return universalService().getDefaultDate({date}).then((res) => {
            console.log('response of getDefaultDate', res.status == 200)
            if (res.status == 200) {
                dispatch(Date(date,res.data))
            }
        })
        .catch(() => {
            console.log({ date, error: 'Oops! Something went wrong and we couldn\'t get daf date'});
        });
    }
}


