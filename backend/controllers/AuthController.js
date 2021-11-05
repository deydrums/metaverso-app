'use strict'

const {response} = require('express');
const { connection } = require('../database/config');
var bcrypt = require('bcryptjs');


/********************************Registro de Usuarios ***********/

const register = async(req,res = response)=>{
    try {

        //Buscar si existe el usuario con el email indicado.

        const sql_search = `SELECT * FROM users WHERE email = '${req.body.email}'`
        await connection.query(sql_search, (err, result) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error'
                });
            }else{
                res.status(400).json({
                    ok: true,
                    message: 'El email ya ha sido registrado anteriormente'
                });
            };
        })

        //Si no existe el usuario, se procede al registro.

        const sql = `INSERT INTO users SET ?`
        const user = {
            name: req.body.name,
            email: req.body.email
        }

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password,salt);


        await connection.query(sql, user, (err, result) => {
            if(err){
                console.log(err)
                res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error'
                });
            }else{
                res.status(201).json({
                    ok: true,
                    message: 'Registro de usuario exitoso',
                    data: result
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