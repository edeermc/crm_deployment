const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Usuario no autenticado');
        error.errorCode = 401;
        throw error;
    }
    
    const token = authHeader.split(' ')[1];
    let revisaToken;
    try {
        revisaToken = jwt.verify(token, 'SECRETO!');
    } catch (error) {
        error.errorCode = 500;
        throw console.error;
    }

    if (!revisaToken) {
        const error = new Error('Usuario no autenticado');
        error.errorCode = 401;
        throw error;
    } 
    
    next();
}