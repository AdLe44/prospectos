const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'clave'
}, async (correo, clave, done) => {
    const users = await Users.findOne({correo: correo});
    if(!users){
        return done(null, false, {message: 'Usuario no encontrado'});
    }else{
        console.log(users.matchPassword(clave));
        const match = await users.matchPassword(clave);
        if(match){
            return done(null, users);
        }else{
            return done(null, false, {message: 'La contraseña es incorrecta'});
        }
    }
}));

passport.serializeUser((users, done) =>{
    done(null, users.id);
});

passport.deserializeUser((id, done) =>{
    Users.findById(id, (err, users) => {
        done(err, users);
    });
});