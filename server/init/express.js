import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import  cors  from 'cors';

var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import User from '../db/mongo/models/user';

export default (app) => {

    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, function (userName, password, done) {
        console.log('Auth passport')
        User.findOne({
            userName: userName,
        }, function (err, user) {
            return err
                ? done(err) : user
                    ? passport === user.password
                        ? done(null, user)
                        : done(null, false, {message: 'Некорректный пароль'})
                    : done(null, false, {message: 'Некорректное имя пользователя'})
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });


    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err,user){
            err
                ? done(err)
                : done(null,user);
        });
    });

    app.use(cors());
    app.set('port', (process.env.PORT || 3001));
    app.use(cookieParser());
    app.use(session({
        secret: 'lovely secret!',
        resave: false,
        //saveUnitialized: false,
        //store: new MongoStore({
        //    url : "mongodb://nikfed1:1127215@ds147480.mlab.com:47480/notes"
        //})
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

}


