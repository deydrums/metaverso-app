'use strict'

const {response} = require('express');
const { connection } = require('../database/config');
var bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


/********************************Registro de Usuarios ***********/

const register = async(req,res = response)=>{
    try {

        //Buscar si existe el usuario con el email indicado.

        const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE email = '${req.body.email}'`
        await connection.query(sql_search, async (err, result) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error'
                });
            }else{
                if(result.length != 0){
                    res.status(400).json({
                        ok: true,
                        message: 'El email ya ha sido registrado anteriormente'
                    });
                }else{
                    //Si no existe el usuario, se procede al registro.

                    const sql = `INSERT INTO users SET ?`
                    const user = {
                        name: req.body.name,
                        email: req.body.email
                    }

                    //Encriptar contraseña
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(req.body.password,salt);

                    //Generar Token de autenticacion
                    const token = await generateJWT(user.id, user.name);

                    //Crear usuario en la base de datos
                    await connection.query(sql, user, async (err) => {
                        if(err){
                            res.status(400).json({
                                ok: false,
                                message: 'Ha ocurrido un error'
                            });
                        }else{
                            await connection.query(sql_search, async (err, result) => {
                                if(err){
                                    res.status(400).json({
                                        ok: false,
                                        message: 'Ha ocurrido un error'
                                    });
                                }else{
                                        res.status(201).json({
                                            ok: true,
                                            message: 'Registro de usuario exitoso',
                                            data: result[0],
                                            token
                                        });
                                    }
                                });

                        };
                    })
                }
            };
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


/********************************Login de Usuarios **************/

const login = async(req,res = response)=>{
    const {email, password} = req.body
    const sql_search = `SELECT id, name, email, dpi, image, tel, password  FROM users WHERE email = '${email}'`

    try {

        await connection.query(sql_search, async (err, result) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error'
                });
            }else{
                if(result.length == 0){
                    res.status(404).json({
                        ok: false,
                        message: 'El usuario con el correo indicado no existe',
                    });
                }else{
                    
                    //Confirmar los passwords
                    const validPassword = bcrypt.compareSync(password, result[0].password);
                    if(!validPassword){
                        return res.status(400).json({
                            ok: false,
                            message: 'Password incorrecto'
                        });
                    };

                    //Generar Token de autenticacion
                    const token = await generateJWT(result[0].id, result[0].name);

                    res.status(200).json({
                        ok: true,
                        data: result[0],
                        token
                    });
            

                }
    
            }
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

/********************************Renew Token ***** **************/
const renew = async(req,res = response)=>{
    const uid = req.uid;
    const name = req.name;
    const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE id = '${uid}'`
    try {
        //Generar Token de autenticacion
        const token = await generateJWT(uid, name);

        await connection.query(sql_search, async (err, result) => {
            if(err){
                res.status(400).json({
                    ok: false,
                    message: 'Ha ocurrido un error'
                });
            }else{
                res.status(201).json({
                    ok: true,
                    message: 'Nuevo token generado',
                    data: result[0],
                    token
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

module.exports = {
    register,
    login,
    renew
};