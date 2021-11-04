'use strict'

const {response} = require('express');
const { connection } = require('../database/config');

/********************************Registro de Usuarios ***********/

const register = async(req,res = response)=>{
    try {
        const sql = `INSERT INTO users SET ?`
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
        connection.query(sql, user, err => {
            if(err){
                res.status(401).json({
                    ok: false,
                    message: 'Ha ocurrido un error',
                });
            }else{
                res.status(201).json({
                    ok: true,
                    message: 'Registro de cliente exitoso',
                    data: user
                });
            };
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    register,
};