'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Ejecutar express
const app = express();

//DDBB
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Rutas
app.use('/api/auth', require('./routes/auth'));

//Iniciar Servidor
app.listen(process.env.PORT ,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

