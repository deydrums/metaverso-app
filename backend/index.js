'use strict'

const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//Ejecutar express
const app = express();

//DDBB
dbConnection();

//Configurar cors
app.use(cors());

//Directorio publico
app.use(express.static('public'));


//Lectura y parseo del body
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/event', require('./routes/event'));

//Iniciar Servidor
app.listen(process.env.PORT ,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

