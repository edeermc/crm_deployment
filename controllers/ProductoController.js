const Producto = require('../models/Producto');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }), 
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato de imagen no válido'));
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({ mensaje: error });
        }
        return next();
    });
}

exports.creaProducto = async (req, res) => {
    const producto = new Producto(req.body);

    try {
        if (req.file) {
            producto.imagen = req.file.filename;
        }
        await producto.save();
        res.json({ mensaje: 'Se agrego un nuevo producto' });
    } catch(e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error guardando la información' });
    }
}

exports.verProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});

        res.json(productos);
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al seleccionar los productos' });
    }
}

exports.verProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            res.json({ mensaje: 'No existe el producto solicitado' });
        } else {
            res.json(producto);
        }
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al seleccionar el producto' });
    }
}

exports.actualizaProducto = async(req, res) => {
    try {
        const vProducto = await Producto.findById(req.params.id);
        let nProducto = req.body;
        if (req.file) {
            nProducto.imagen = req.file.filename;
        } else {
            nProducto.imagen = vProducto.imagen;
        }

        
        if (vProducto.imagen) {
            fs.unlink(`${__dirname}../../uploads/${vProducto.imagen}`, function (error) {
                if (error) {
                    console.log('No existe el archivo especificado: ', error);
                } else {
                    console.log('Se ha eliminado la imagen');
                }
            });
        }
        const producto = await Producto.findOneAndUpdate({ _id: req.params.id }, nProducto, { new: true });

        res.json(producto);
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error actualizando el producto' });
    }
}

exports.eliminaProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto.imagen) {
            fs.unlink(`${__dirname}../../uploads/${producto.imagen}`, function (error) {
                if (error) {
                    console.log('No existe el archivo especificado: ', error);
                } else {
                    console.log('Se ha eliminado la imagen');
                }
            });
        }
        await Producto.findOneAndDelete({ _id: req.params.id });

        res.json({ mensaje: 'El producto se ha eliminado'});
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error actualizando el producto' });
    }
}

exports.buscaProducto = async (req, res) => {
    try {
        const productos = await Producto.find({ nombre: new RegExp(req.params.query, 'i') });
        res.json(productos);
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al consultar a la BD' });
    }
}