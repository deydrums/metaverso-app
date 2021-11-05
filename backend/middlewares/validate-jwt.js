const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    //x-token headers
    const token = req.header('token');
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se ha enviado ningun token'
        });
    };

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = payload.uid
        req.name = payload.name
        req.email = payload.email
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }


    next();
}

module.exports = {
    validateJWT
}