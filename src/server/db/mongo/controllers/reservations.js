import _ from 'lodash';
import Reservation from '../models/reservations';
import { Courts } from '../../../../components/Storage';

function courtForming(reservations) {
    console.log('Get reservations result', reservations)
    let courtOrigin = Courts(0),
        court = JSON.stringify(courtOrigin);
        court = JSON.parse(court);
        courtOrigin = null;
    let reserve = reservations[0] == undefined ? reservations : reservations[0];

    console.log('Default court', court)
    if(reserve == undefined || reserve.reservation == undefined) {
        let date = new Date();
            court.day = date.getDate(),
            court.month = date.getMonth(),
            court.year = date.getFullYear(),
            court._id = 0;
        console.log('Empty object. Default is defined', reserve, reservations)
        return court;
    }
    court.court = reserve.court;
    court.day = reserve.day;
    court.month = reserve.month;
    court.year = reserve.year;
    court._id = reserve._id;

    court.data.forEach(function (schedule) {
        reserve.reservation.forEach(function (reserved) {
            if(schedule.hour == reserved.hour) {
                schedule.status = reserved.status;
                schedule._id_ = reserved._id;
                schedule.value = '';
            }
        })
    })

    console.log('Reservation schedule for ' + court.day + '.' + court.month, court)
    return court;
}

export function getReservations(req, res) {
    let date = req.body.date != undefined ? new Date(req.body.date) : new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    Reservation.find({
        day:day,
        month:month,
        year:year
    }).exec((err, reservations) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong');
        }



        console.log('Success in query___getReservations ');
        res.header('Accept', 'text/json');
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        //res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

        res.json(courtForming(reservations));
    })
}

export function add(req, res) {
    let date = new Date(req.body.date),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        reservation = {
            hour:req.body.hour,
            date: date,
            court: req.body.date,
            userInfo: req.body.userInfo,
            userPhone: req.body.userPhone,
            summ: req.body.summ,
            status: 'holden'
        }

        console.log('Add request body', req.body);

    if(req.body.id == 0) {

        Reservation.create({
            day:day,
            month:month,
            year:year,
            court:req.body.court,
            reservation
        }, (err, reservations) => {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log('Default date created ' + reservations)
            return res.json(courtForming(reservations));
        });
    } else {
        Reservation.findById(req.body.id, function (err, reservations) {
            if (err) {
                console.log('Error while searching by key ' + req.body.id)
            }

            reservations.reservation.forEach(function (reserved) {
                if(reserved.hour == req.body.hour) {
                   console.log('Time already Reserved ' + reserved.hour );
                   res.status(500);
                }
            })

            reservations.reservation.push(reservation);
            reservations.save();

            console.log('New Reservation has been successfully saved' + reservations)

            return res.json(courtForming(reservations));
            })
    }
}

export default {
    getReservations,
    add
}