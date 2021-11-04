'use strict'

const {response} = require('express');

/*________________________________________________________
 * 
 *  ----------------CLIENT REGISTER-----------------------
 * _______________________________________________________
 */

const register = async(req,res = response)=>{
    try {

        res.status(201).json({
            ok: true,
            message: 'Registro de cliente exitoso',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    register,
};