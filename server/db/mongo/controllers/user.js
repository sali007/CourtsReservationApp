import User from '../models/user';
import Crypto from 'crypto';
import passport from 'passport';

function login(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
            return err
                ? next(err)
                : user
                    ? req.logIn(user, function(err) {
                        return err
                            ? next(err)
                            : res.redirect('/private');
                    })
                    : res.redirect('/');
        }
    )(req, res, next);
};

function register(req, res, next) {
  var user = new User({
      userName: req.body.data.userName,
      password: req.body.data.password
  });
  user.save(function(err) {
      return err
         ? next(err)
          : req.login(user, function(err) {
              return err
                 ? next(err)
                  : res.redirect('/admin')
          });
  });
};

function logout(req, res) {
    req.logout();
    res.redirect('/');
}

function mustAuthenticateedMw(req, res, next) {
    req.isAuthenticated()
       ? next()
        : res.status(500)
    //res.redirect('/');
}

/*function createUser(req, res) {

    console.log('Create user request', req.body)

    User.create({
        userName: req.body.userName,
        phone: req.body.phone,
        password: hash(req.body.password).toString()
    }, (err,savedUser) => {
        if(savedUser == undefined) {
            console.log('Such user already exists')
            return res.status(400).send('User Already exists')
        }
        console.log('User is created', savedUser)
        return res.status(200).send(savedUser)
    })
}

function getUser(id) {
    return User.findOne(id);
}

function checkUser(req, res) {

    console.log('Check user request', req.body)
    var h = hash(req.body.data.password)
    console.log('Your pass ',h)
    if(req.session.user) return res.redirect('/')
    return User.findOne({
        userName: req.body.data.userName
       }).exec((err, doc) => {
        console.log('response',doc)

        if(doc != null) {
            if (doc.password == hash(req.body.data.password)) {
                console.log('User password is Ok');
            }
        }else {
            return Promise.reject('Error. Wrong Password')
        }
    }).then(function (user) {
        if(user) {
            req.session.user = {
                id: user._id,
                name: user.name
            }
            return res.redirect('/')
        } else {
            console.log('Error Check user');
            res.status(400).send('Ошибка авторизации')
        }
    })
}

function hash(text) {
    return Crypto.createHash('sha1')
        .update(text).digest('base64')
}*/

export default {
    login,
    register,
    logout,
    mustAuthenticateedMw
}
