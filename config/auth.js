const localStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const Client = require('../models/Client');

module.exports = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email',
    }, (email, password, done) => {
        Client.findOne({
            email: email
        }).then( (client) => {
            if(!client) {
                return done(null, false, {
                    message: 'Esta conta não existe',
                    status: 'email',
                })
            }
            bcrypt.compare(password, client.password, (err, success) => {
                if(success) {
                    return done(null, client);
                }
                return done(null, false, {
                    message: 'Senha incorreta',
                    status: 'password',
                });
            })
        }).catch( () => {
            console.log('Erro ao procurar usuario por email');
        })
    }))

    passport.serializeUser( (client, done) => {
        done(null, client.id);
    })

    passport.deserializeUser( (id, done) => {
        Client.findById({
            _id: id
        }, (err, client) => {
            done(err, client);
        })
    })
}