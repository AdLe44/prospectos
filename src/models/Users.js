const mongoose = require('mongoose'); 
const { Schema } = mongoose;
const bcrypt = require('bcryptjs'); 

const UsersSchema = new Schema({
    nombre: {type: String, required:true},
    correo: {type: String, required:true},
    clave: {type: String, required:true},
    area: {type: Boolean, required:true}, 
    date: {type: Date, default:Date.now}, 
});

UsersSchema.methods.encryptPassword = async (clave) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(clave, salt);
    return hash;
};

UsersSchema.methods.matchPassword = async function (clave){
    return await bcrypt.compare(clave, this.clave);
}

module.exports = mongoose.model('Users',UsersSchema)