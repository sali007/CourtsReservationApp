import User from '../models/user';
import passport from 'passport';

/**
 * POST /login
 */
export function login(req, res, next) {
    // Do email and password validation for the server
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) return next(authErr);
        if (!user) {
            console.log('Login', user, info, authErr, req.body)
            return res.status(401).json({ message: info.message });
        }
        // Passport exposes a login() function on req (also aliased as
        // logIn()) that can be used to establish a login session
        return req.logIn(user, (loginErr) => {
            if (loginErr) return res.status(401).json({ message: loginErr });

            console.log(req.isAuthenticated())
            res.redirect('/admin')
            //return res.status(200).json({
            //    message: 'You have been successfully logged in.'
            // });
        });
    })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
    // Do email and password validation for the server
    req.logout();
    res.json({_id:0, email: 'Гость'})
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });

    console.log('User object', user)
    User.findOne({ email: req.body.email }, (findErr, existingUser) => {
        console.log('excisting user', existingUser)
        if (existingUser) {
            return res.status(409).json({ message: 'Account with this email address already exists!' });
        }

        return user.save((saveErr) => {
            if (saveErr) return next(saveErr);
            return req.logIn(user, (loginErr) => {
                if (loginErr) return res.status(401).json({ message: loginErr });
                return res.status(200).json(user);
            });
        });
    });
}


export default {
    login,
    signUp,
    logout
}
