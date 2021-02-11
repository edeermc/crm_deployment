const Cliente = require('../models/Cliente');

exports.creaCliente = async (req, res) => {
    const cliente = new Cliente(req.body);

    try {
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente' });
    } catch(e) {
        console.log(e);
        //res.json({ mensaje: 'Ha ocurrido un error guardando la información' });
        res.send(e);
    }
}

exports.verClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find({});

        if (!clientes) {
            res.json({ mensaje: 'No se han agregado clientes' });
        } else {
            res.json(clientes);
        }
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error obteniendo la información' });
    }
}

exports.verCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            res.json({ mensaje: 'No existe el cliente solicitado' });
        } else {
            res.json(cliente);
        }
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error obteniendo la información' });
    }
}

exports.actualizaCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.json(cliente);
    } catch (e) {
        console.log(e);
        //res.json({ mensaje: 'Ha ocurrido un error obteniendo la información' });
        res.send(e);
    }
}

exports.eliminaCliente = async (req, res) => {
    try {
        await Cliente.findOneAndDelete({ _id: req.params.id });

        res.json({ mensaje: 'Se ha eliminado el registro' });
    } catch (e) {
        console.log(e);
        //res.json({ mensaje: 'Ha ocurrido un error obteniendo la información' });
        res.send(e);
    }
}