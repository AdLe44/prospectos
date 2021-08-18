const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const ProspectosSchema = new Schema({
    NombreAdd: {type: String, required:true},
    APAdd: {type: String, required:true},
    AMAdd: {type: String, required:true},
    CalleAdd: {type: String, required:true}, 
    NumeroAdd: {type: Number, required:true}, 
    ColAdd: {type: String, required:true}, 
    CPAdd: {type: Number, required:true}, 
    TelAdd: {type: Number, required:true}, 
    RFCAdd: {type: String, required:true}, 
    /* DocAdd: {type: String, required:true}, */ 
    Estatus: {type: String, required:true, default:'Enviado'}, 
    date: {type: Date, default:Date.now}, 
});

module.exports = mongoose.model('Prospectos',ProspectosSchema)