const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Producto', productoSchema);