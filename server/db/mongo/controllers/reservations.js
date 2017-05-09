import _ from 'lodash';
import Reservation from '../models/reservations';
import { Courts } from '../../../../src/components/Storage';

function courtForming(reservations, d) {
    console.log('Get reservations result', d)
    let courtOrigin = Courts(),
        courtDefault = JSON.stringify(courtOrigin);
        courtDefault = JSON.parse(courtDefault);
        courtOrigin = null;
    //let reserve = reservations;
    let date = new Date(d);
    if (reservations.length == 0 || reservations == undefined) {
        var courtCounter = 0;

        courtDefault.forEach(function (court, counter) {

            courtDefault[counter].day = date.getDate(),
                courtDefault[counter].month = date.getMonth(),
                courtDefault[counter].year = date.getFullYear(),
                courtDefault[counter]._id = 0;
            console.log('Empty object. Default is defined')
            //return court;
            counter++;
        })
        console.log('Default object')
        return courtDefault;
    }

    if(reservations)

    reservations.forEach(function (court) {

        if (court == undefined || court.reservation == undefined) {
            console.log('Default court')
            let date = new Date();
            courtDefault[court.court].day = date.getDate(),
                courtDefault[court.court].month = date.getMonth(),
                courtDefault[court.court].year = date.getFullYear(),
                courtDefault[court.court]._id = 0;
            console.log('Empty object. Default is defined')
            //return court;
        }

        courtDefault[court.court].court = court.court;
        courtDefault[court.court].day = court.day;
        courtDefault[court.court].month = court.month;
        courtDefault[court.court].year = court.year;
        courtDefault[court.court]._id = court._id;
        console.log('court state ¹1')

        courtDefault[court.court].data.forEach(function (schedule) {
            court.reservation.forEach(function (reserved) {
                if (schedule.hour == reserved.hour) {
                    schedule.status = reserved.status;
                    schedule._id_ = reserved._id;
                    schedule.value = '';
                }
            })
        });
        console.log('Reservation schedule for ' + court.day + '.' + court.month)

    })

        return courtDefault;

}

export function getReservations(req, res) {
    console.log('getReservations req.data', req.body)
    let date = req.body.date != undefined ? new Date(req.body.date) : new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();


    Reservation.find({
        day:day,
        month:month,
        year:year,
    }).exec((err, reservations) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong');
        }

        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTION')
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin-Headers', 'Origin, Content-Type, Accept');
        /*res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,GET,OPTIONS'
        })*/

        console.log('Success in query___getReservations ');
        /*res.header('Accept', 'text/json');
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');*/
        //console.log('Headers req', req);
        console.log('Get Reservation date', date);
        res.json(courtForming(reservations, req.body.date));
    })
}

export function confirm(req, res) {

}

export function add(req, res) {
    let date = new Date(req.body.date),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        reservation = {
            hour:req.body.hour,
            date: date,
            username: req.body.userInfo,
            phone: req.body.userPhone,
            summ: req.body.summ,
            status: 'holden'
        }

        console.log('Add request body for court ',req.body);



    if(req.body.id == 0) {

        Reservation.create({
            day:day,
            month:month,
            year:year,
            court: req.body.court,
            reservation
        }, (err, reservations) => {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            console.log('ID null Default date created ')
            return getReservations(req, res)
        });
    } else {

        Reservation.find({
            day: day,
            month: month,
            year: year,
            court:req.body.court
        }, function (err, reservations) {
            if (err || reservations.length == 0) {
                console.log('Error while searching by key ' + req.body.id)
                console.log('Empty reservation result')
                Reservation.create({
                    day:day,
                    month:month,
                    year:year,
                    court: req.body.court,
                    reservation
                }, (err, reservation) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send(err);
                    }
                    console.log('Default date created ')
                    return getReservations(req, res)
                });
            } else {

                reservations[0].reservation.forEach(function (reserved) {
                    if (reserved.hour == req.body.hour) {
                        console.log('Time already Reserved ' + reserved.hour);
                        res.status(500);
                    }
                })

                reservations[0].reservation.push(reservation);
                reservations[0].save(function (err) {
                    if(err) return res.status(400).send('Error while saving user profile');
                    console.log('New Reservation has been successfully saved')

                    //getReservations(req, res)
                    return getReservations(req, res)
                });
            }
            })
    }
}

export default {
    getReservations,
    add,
    confirm
}