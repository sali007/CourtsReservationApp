import React from 'react';
import * as reducers from '../../src/reducers';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { match, RouterContext } from 'react-router';
import { controllers, passport as passportConfig } from '../db'

const userReservationController = controllers && controllers.reservations;
const usersController = controllers && controllers.users;

export default (app) => {

    if(usersController) {
        app.post('/login', usersController.login);
        app.post('/signUp', usersController.signUp);
        app.post('/logout', usersController.logout);
    } else {
        console.warn('user Routes trbl');
    }

    if(userReservationController) {
        app.post('/reservation', userReservationController.getReservations);
        app.post('/addReservation', userReservationController.add)
    } else {
        console.warn('fail to load controller');
    }

    /*app.get('/admin', (req, res) => {

        if(req.isAuthenticated()) {
            console.log('Request Authenticated', req.isAuthenticated());


                res.header('Access-Control-Allow-Methods', 'POST,GET,OPTION')
                res.header('Access-Control-Allow-Origin', '*');

            res.redirect('/admin');
            } else {
            res.redirect('/login').json({message: 'Authorization faild'})
        }

    })*/
}

