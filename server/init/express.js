import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import  cors  from 'cors';
import logger from 'morgan';
import passport from 'passport';

import { session as dbSession } from '../db';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('req-flash');

export default (app) => {

    app.use(cors());
    app.set('port', (process.env.PORT || 3001));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(logger('dev'));

    let sessionStore = null;
    if (!dbSession) {
        console.warn(unsupportedMessage('session'));
    } else {
        sessionStore = dbSession();
    }

    const sess = {
        resave: false,
        saveUninitialized: false,
        secret: 'secrett',
        proxy: true, // The "X-Forwarded-Proto" header will be used.
        name: 'sessionId',
        // Add HTTPOnly, Secure attributes on Session Cookie
        // If secure is set, and you access your site over HTTP, the cookie will not be set
        cookie: {
            httpOnly: true,
            secure: false,
        },
        store: sessionStore
    };


    app.use(session(sess));

    //inisialize passport
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash())

}


