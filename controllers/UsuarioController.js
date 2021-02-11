const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registraUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    usuario.contrasena = await bcrypt.hash(req.body.contrasena, 12);

    try {
        await usuario.save();
        res.json({ mensaje: 'Se ha creado el usuario exitosamente' });
    } catch (e) {
        console.log(e);
        res.json({ mensaje: 'Ha ocurrido un error al guardar el usuario' });
    }
}

exports.autenticaUsuario = async (req, res) => {
    const usuario = await Usuario.findOne({ correo: req.body.correo });

    if (!usuario) {
        await res.status(401).json({ mensaje: 'El usuario no existe' });
    } else {
        if (!bcrypt.compareSync(req.body.contrasena, usuario.contrasena)) {
            await res.status(401).json({ mensaje: 'Usuario no autorizado' });
        } else {
            const token = jwt.sign({
                correo: usuario.correo,
                nombre: usuario.nombre,
                _id: usuario._id
            }, 
            'SECRETO!',
            {
                expiresIn: '1h'
            });

            res.json({ token });
        }
    }
}