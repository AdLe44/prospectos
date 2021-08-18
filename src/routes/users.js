const router = require('express').Router();

const Users = require('../models/Users');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});
router.post('/users/signup', async (req, res) => {
    const {nombre,correo,clave,confclave,areaS} = req.body;
    const errors = [];
    if(clave != confclave){
        errors.push({text: 'Las claves no coinciden'});
    }
    if(clave.length < 4 || clave.length > 16){
        errors.push({text: 'Las claves no cumple con los requisitos de longitud 4 - 16 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, nombre, correo, clave, confclave , area})
    }else{
        const correoUser = await Users.findOne({correo: correo});
        if(correoUser){
            req.flash('error_msg', 'Correo ya registrado');
            res.redirect('/users/signup');
        }
        if(areaS==='Evaluadores'){
            area = true;
        }else{
            area = false;
        }
        const newUser = new Users({nombre,correo,clave,area})
        newUser.clave = await newUser.encryptPassword(clave);
        await newUser.save();
        req.flash('success_msg', 'Usuario registrado');
        res.redirect('/users/signin');
    }
});
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/prospectos',
    failureRedirect: '/users/signin',
    failureFlash: true
}));
router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});
module.exports = router;