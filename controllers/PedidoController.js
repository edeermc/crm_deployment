const Pedido = require('../models/Pedido');

exports.creaPedido = async (req, res) => {
    const pedido = new Pedido(req.body);

    try {
        pedido.save();

        res.json({ mensaje: 'Se ha creado un nuevo pedido' });
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error guardando la información' });
    }
}

exports.verPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({}).populate('cliente').populate({
            path: 'productos.producto',
            model: 'Producto'
        });

        res.json(pedidos);
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error seleccionando la información' });
    }
}

exports.verPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('cliente').populate({
            path: 'productos.producto',
            model: 'Producto'
        });
        if (!pedido) {
            res.json({ mensaje: 'El pedido solicitado no existe' });
        } else {
            res.json(pedido);
        }
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al obtener el pedido' });
    }
}

exports.actualizaPedido = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const pedido = await Pedido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('cliente').populate({
            path: 'productos.producto',
            model: 'Producto'
        });

        res.json(pedido);
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al actualizar el pedido' });
    }
}

exports.eliminaPedido = async (req, res) => {
    try {
        await Pedido.findByIdAndRemove(req.params.id);

        res.json({ mensaje: 'Se ha eliminado el pedido correctamente' });
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al actualizar el pedido' });
    }
}