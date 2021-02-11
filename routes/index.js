const { request } = require('express');
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const clienteController = require('../controllers/ClienteController');
const productoController = require('../controllers/ProductoController');
const pedidoController = require('../controllers/PedidoController');
const usuarioController = require('../controllers/UsuarioController');

module.exports = function() {
    router.get('/cliente', auth, clienteController.verClientes);
    router.get('/cliente/:id', auth, clienteController.verCliente);
    router.post('/cliente', auth, clienteController.creaCliente);
    router.put('/cliente/:id', auth, clienteController.actualizaCliente);
    router.delete('/cliente/:id', auth, clienteController.eliminaCliente);

    router.get('/producto', auth, productoController.verProductos);
    router.get('/producto/:id', auth, productoController.verProducto);
    router.post('/producto', auth, productoController.subirArchivo, productoController.creaProducto);
    router.put('/producto/:id', auth, productoController.subirArchivo, productoController.actualizaProducto);
    router.delete('/producto/:id', auth, productoController.eliminaProducto);
    router.post('/producto/busqueda/:query', auth, productoController.buscaProducto);

    router.get('/pedido', auth, pedidoController.verPedidos);
    router.get('/pedido/:id', auth, pedidoController.verPedido);
    router.post('/pedido', auth, pedidoController.creaPedido);
    router.put('/pedido/:id', auth, pedidoController.actualizaPedido);
    router.delete('/pedido/:id', auth, pedidoController.eliminaPedido);

    router.post('/crear-cuenta', usuarioController.registraUsuario);
    router.post('/iniciar-sesion', usuarioController.autenticaUsuario);

    return router;
}