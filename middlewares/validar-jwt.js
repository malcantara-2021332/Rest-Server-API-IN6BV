const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');
    
    //Validar si el token se envia en los headers
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la paticion'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        //Leer al usuario que corresponda el uid
        const usuario = await Usuario.findById( uid );

        //Verificar el uid del usuario, si no existiera
        if (!usuario) {
            return res.status(400).json({
                msg: 'Token no valido, usuario no existe en la base de datos'
            });
        }

        //Verificar si el uid del usuario esta en estado: true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario inactivo : Estado FALSE'
            });
        }

        req.usuario = usuario;
        next();


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }


}

module.exports = {
    validarJWT
}