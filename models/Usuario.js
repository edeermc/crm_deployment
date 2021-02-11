const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    correo: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: 'Agrega un nombre'
    }, 
    contrasena: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);