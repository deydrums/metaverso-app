'use strict'

const {response} = require('express');
const { connection } = require('../database/config');
var bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const fs = require('fs');
const path = require('path');

/********************************Registro de Usuarios ***********/

const register = async(req,res = response)=>{
    try {
        //Buscar si existe el usuario con el email indicado.

        const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE email = '${req.body.email}'`
        await connection.query(sql_search, async (err, result) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
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

                //Crear usuario en la base de datos
                await connection.query(sql, user, async (err) => {
                    if(err) {return res.status(401).json({ok:false, message: err.message})};

                    await connection.query(sql_search, async (err, result) => {
                        if(err) {return res.status(401).json({ok:false, message: err.message})};
                            
                        //Generar Token de autenticacion
                        const token = await generateJWT(result[0].id, result[0].name, result[0].email);
                                
                        res.status(201).json({
                            ok: true,
                            message: 'Registro de usuario exitoso',
                            data: result[0],
                            token
                        });
                    });
                });
            };
        });


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

        //Buscar si existe el usuario

        await connection.query(sql_search, async (err, result) => {

            if(err) {return res.status(401).json({ok:false, message: err.message})};

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
                const token = await generateJWT(result[0].id, result[0].name, result[0].email);

                delete result[0].password;

                res.status(200).json({
                    ok: true,
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

/********************************Renew Token ***** **************/
const renew = async(req,res = response)=>{
    const uid = req.uid;
    const name = req.name;
    const email = req.email;
    const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE id = '${uid}'`
    try {
        //Generar Token de autenticacion
        const token = await generateJWT(uid, name,email);

        //Retornar datos del usuario y token

        await connection.query(sql_search, async (err, result) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            res.status(201).json({
                ok: true,
                message: 'Nuevo token generado',
                data: result[0],
                token
            });
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}


/********************************Update  de Usuarios ***********/

const update = async(req,res = response)=>{
    const {uid} = req;
    const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE id = '${uid}'`
    const sql_search_email = `SELECT id, name, email, dpi, image, tel  FROM users WHERE email = '${req.body.email}'`
    const sql = `UPDATE users SET ? WHERE id = '${uid}'`;
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            dpi: req.body.dpi,
            tel: req.body.tel
        }

        //Comprobar que el nuevo correo no pertenezca a otro usuario

        await connection.query(sql_search_email, async (err, result) => {
            if(err) {return res.status(401).json({ok:false, message: err.message})};
            if(result.length > 0 && result[0].id !== uid){
                return res.status(400).json({ok:false, message: "El email ya se encuentra registrado"})
            }

            //Si el correo no pertenece a otro usuario, proceder a actualizar

            await connection.query(sql, user, async (err) => {
                if(err) {return res.status(401).json({ok:false, message: err.message})};

                //Retornar datos actualizados
                
                await connection.query(sql_search, user, async (err, result) => {
                    if(err) {return res.status(401).json({ok:false, message: err.message})};
                    res.status(200).json({
                        ok: true,
                        message: 'Usuario actualizado con exito',
                        data: result
                    })
                });

            });

        });



    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Ha ocurrido un error, intenta de nuevo'
        })
    }
}

/********************************Upload Imagen *****************/

const upload = async(req,res = response)=>{
    const {uid} = req;
    const sql_search = `SELECT id, name, email, dpi, image, tel  FROM users WHERE id = '${uid}'`
    const sql = `UPDATE users SET ? WHERE id = '${uid}'`;
    try {
        const data = {
            image: `${req.file.file_name}`
        }

        await connection.query(sql_search, async (err, result) => {
            if(err) {
                if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
                return res.status(401).json({ok:false, message: err.message})
            };

            if(result.length == 0){
                res.status(404).json({
                    ok: false,
                    message: 'El usuario no existe',
                });
            }else{
                const userimage = result[0].image;
                if(req.file.file_path){
                    if(req.file.file_ext != 'png' && req.file.file_ext != 'jpg' && req.file.file_ext != 'jpeg' && req.file.file_ext != 'webp'){
                        if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
                    }else{
                        if(userimage !== null && userimage !== 'null' && userimage !== undefined && userimage !== 'undefined'){
                            fs.unlinkSync('uploads/users/'+userimage)
                        }
                        await connection.query(sql,data, async (err, result) => {
                            if(err) {
                                if(req.file.file_path){fs.unlinkSync(req.file.file_path)}
                                return res.status(401).json({ok:false, message: err.message})
                            };
                            res.status(201).json({
                                ok: true,
                                message: 'Imagen subida con exito',
                                data  
                            })
                        });
                        
                    }
                }

            }
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
    login,
    renew,
    update,
    upload
};