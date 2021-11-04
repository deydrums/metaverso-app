'use strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'metaverso'
  });
 

  
const dbConnection = async() =>{
    try {
        await connection.connect();
        console.log('DB Online');
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar ddbb')
    }
}

module.exports ={
    dbConnection,
    connection
}