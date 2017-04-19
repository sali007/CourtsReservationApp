import User from '../models/user';
import Crypto from 'crypto';

function createUser(req, res) {

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
    var h = hash(req.body.password)
    console.log('Your pass ',h)
    //if(req.session.user) return res.redirect('/register')
    return User.findOne({
        phone: req.body.phone
       }).exec((err, doc) => {
        console.log('response',doc)
        if (doc.password == hash(req.body.password)) {
            console.log('User password is Ok');
        } else {
            return Promise.reject('Error. Wrong Password')
        }
    }).then(function (user) {
        if(user) {
            req.session.user = {
                id: user._id,
                name: user.name
            }
            return res.redirect('/')
           retunr
        } else {
            console.log('Error Check user');
            res.status(400).send('Auth Error')
        }
    })
}

function hash(text) {
    return Crypto.createHash('sha1')
        .update(text).digest('base64')
}

export default {
    createUser,
    getUser,
    checkUser
}
