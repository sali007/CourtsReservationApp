//'use strict';
import uuid from 'uuid';
import moment from 'moment';
import 'moment/locale/ru';
import { observable, computed, autorun, action } from 'mobx';

const courts = [
    {
        court: 1,
        status: 'ready',
        data: [
            {
                _id_: uuid.v4(),
                hour:6,
                timeslot: '6 - 7',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:7,
                timeslot: '7 - 8',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:8,
                timeslot: '8 - 9',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:9,
                timeslot: '9 - 10',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:10,
                timeslot: '10 - 11',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:11,
                timeslot: '11 - 12',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:12,
                timeslot: '12 - 13',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:13,
                timeslot: '13 - 14',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:14,
                timeslot: '14 - 15',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:15,
                timeslot: '15 - 16',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:16,
                timeslot: '16 - 17',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:17,
                timeslot: '17 - 18',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:18,
                timeslot: '18 - 19',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:19,
                timeslot: '19 - 20',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:20,
                timeslot: '20 - 21',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:21,
                timeslot: '21 - 22',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:22,
                timeslot: '22 - 23',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:23,
                timeslot: '23 - 24',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:24,
                timeslot: '24 - 01',
                value: 800,
                status: 'free'
            }
        ]
    },

    {
        court: 2,
        status: 'ready',
        data: [
            {
                _id_: uuid.v4(),
                hour:6,
                timeslot: '6 - 7',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:7,
                timeslot: '7 - 8',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:8,
                timeslot: '8 - 9',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:9,
                timeslot: '9 - 10',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:10,
                timeslot: '10 - 11',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:11,
                timeslot: '11 - 12',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:12,
                timeslot: '12 - 13',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:13,
                timeslot: '13 - 14',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:14,
                timeslot: '14 - 15',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:15,
                timeslot: '15 - 16',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:16,
                timeslot: '16 - 17',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:17,
                timeslot: '17 - 18',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:18,
                timeslot: '18 - 19',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:19,
                timeslot: '19 - 20',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:20,
                timeslot: '20 - 21',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:21,
                timeslot: '21 - 22',
                value: 1100,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:22,
                timeslot: '22 - 23',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:23,
                timeslot: '23 - 24',
                value: 800,
                status: 'free'
            },
            {
                _id_: uuid.v4(),
                hour:24,
                timeslot: '24 - 01',
                value: 800,
                status: 'free'
            }
        ]
    }
];

export const Courts = function (court, stamp) {
    return courts[court];
};
