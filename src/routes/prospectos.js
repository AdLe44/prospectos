const router = require('express').Router();

const Prospecto = require('../models/Prospectos');
const { isAuthenticated } = require('../helpers/auth');
const Users = require('../models/Users');

router.get('/prospectos/add', (req, res) => {
    res.render('prospectos/new-prospectos');
});

router.post('/prospectos/new-prospecto', isAuthenticated, async(req, res) => {
    const {NombreAdd, APAdd, AMAdd, CalleAdd, NumeroAdd, ColAdd, CPAdd, TelAdd, RFCAdd, /* DocAdd */} = req.body;
    const errors = [];
    if(!NombreAdd){
        errors.push({text: 'Se requiere insertar el nombre'});
    }
    if(!APAdd){
        errors.push({text: 'Se requiere insertar el apellido paterno'});
    }
    if(!AMAdd){
        errors.push({text: 'Se requiere insertar el apellido materno'});
    }
    if(!CalleAdd){
        errors.push({text: 'Se requiere insertar la calle'});
    }
    if(!NumeroAdd){
        errors.push({text: 'Se requiere insertar el número'});
    }
    if(!ColAdd){
        errors.push({text: 'Se requiere insertar la colonia'});
    }
    if(!CPAdd){
        errors.push({text: 'Se requiere insertar el código postal'});
    }
    if(!TelAdd){
        errors.push({text: 'Se requiere insertar el teléfono'});
    }
    if(!RFCAdd){
        errors.push({text: 'Se requiere insertar el RFC'});
    }
    /* if(!DocAdd){
        errors.push({text: 'Se requiere insertar el / los documento / s'});
    } */
    if(errors.length > 0){
        res.render('prospectos/new-prospectos',{
            errors,
            NombreAdd,
            APAdd,
            AMAdd, 
            CalleAdd, 
            NumeroAdd, 
            ColAdd, 
            CPAdd, 
            TelAdd, 
            RFCAdd, 
            /* DocAdd */
        })
    }else{
        const newPospecto = new Prospecto({NombreAdd, APAdd, AMAdd, CalleAdd, NumeroAdd, ColAdd, CPAdd, TelAdd, RFCAdd, /* DocAdd */});
        /* console.log(newPospecto); */
        await newPospecto.save();
        req.flash('success_msg', 'Prospecto agregado');
        res.redirect('/prospectos');
    }
});

router.get('/prospectos', isAuthenticated, async (req, res) => {
    const prospec = await Prospecto.find().sort({date: 'desc'}); /* el wher es dentro de find asi: find({NombreAdd, 'el nombre'}) */
    res.render('prospectos/all-prospectos', { prospec });
});

router.get('/prospectos/estatusAuth/:id', isAuthenticated, async (req, res) => {
    if(req.user.area){
        await Prospecto.findByIdAndUpdate(req.params.id, {Estatus:'Autorizado'});
        req.flash('success_msg', 'Estatus del prospecto modificado');
        res.redirect('/prospectos');
    }else{
        res.redirect('/prospectos');
    }
});

router.get('/prospectos/estatusRech/:id', isAuthenticated, async (req, res) => {
    if(req.user.area){
        await Prospecto.findByIdAndUpdate(req.params.id, {Estatus:'Rechazado'});
        req.flash('success_msg', 'Estatus del prospecto modificado');
        res.redirect('/prospectos');
    }else{
        res.redirect('/prospectos');
    }
});

module.exports = router;