//'use strict';
import uuid from 'uuid';
import moment from 'moment';
import 'moment/locale/ru';
import { observable, computed, autorun, action } from 'mobx';

const courts = [
    {
        court: 1,
        status: 'ready',
        date: '16 12 2016',
        data: [
            {
                _id_: uuid.v4(),
                timeslot: '06:00 - 07:00',
                value: 800,
                status: 'hiden'
            },
            {
                _id_: uuid.v4(),
                timeslot: '07:00 - 08:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '08:00 - 09:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '09:00 - 10:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '10:00 - 11:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '11:00 - 12:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '12:00 - 13:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '13:00 - 14:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '14:00 - 15:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '15:00 - 16:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '16:00 - 17:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '17:00 - 18:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '18:00 - 19:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '19:00 - 20:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '20:00 - 21:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '21:00 - 22:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '22:00 - 23:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '23:00 - 24:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '24:00 - 01:00',
                value: 800,
                status: 'free'
            }
        ]
    },
    {
        court: 2,
        status: 'ready',
        date: '16 12 2016',
        data: [
            {
                _id_: uuid.v4(),
                timeslot: '06:00 - 07:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '07:00 - 08:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '08:00 - 09:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '09:00 - 10:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '10:00 - 11:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '11:00 - 12:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '12:00 - 13:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '13:00 - 14:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '14:00 - 15:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '15:00 - 16:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '16:00 - 17:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '17:00 - 18:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '18:00 - 19:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '19:00 - 20:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '20:00 - 21:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '21:00 - 22:00',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '22:00 - 23:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '23:00 - 24:00',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                timeslot: '24:00 - 01:00',
                value: 800,
                status: 'free'
            }
        ]
    }
];

export const Courts = function (court, stamp) {
    console.log('courts', court, stamp);
    return courts[court];
};

export class Store {
};