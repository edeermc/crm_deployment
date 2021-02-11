const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref:  'Cliente'
    },
    productos: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Producto'
        },
        cantidad: Number
    }],
    total: {
        type: Number
    }
});

module.exports = mongoose.model('Pedido', PedidoSchema);