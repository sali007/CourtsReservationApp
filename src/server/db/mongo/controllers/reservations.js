import _ from 'lodash';
import Reservation from '../models/reservations';

export function getReservations(req, res) {
    let date = new Date(req.body.date),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear();

    //console.log(date + "\n" + day + "\n" + month + "\n" + year)

    Reservation.findOne({day:day,month:month,year:year}).exec((err, reservations) => {
        if (err) {
            console.log('Error in first query');
            return res.status(500).send('Something went wrong');
        }
        //console.log('Success in query___' + reservations);
        res.header('Accept', 'text/json');
        res.header('Access-Control-Allow-Origin: *');
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        //let x = res.json(reservations)
        //console.log('Success in query___' + x );

        return res.json(reservations);
    })
}

export function add(req, res) {
    Reservation.create(req.body, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).send(err);
        }

        return res.status(200).send('OK');
    });
}

export default {
    getReservations,
    add
}