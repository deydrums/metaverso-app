/**
 * 
 * Routas de Usuarios 
 * host + /api/user
 *  
 * */ 

const {Router} = require('express');
const { getUsers, getInfo } = require('../controllers/UserController');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

 
 /********************************Obtener todos los usuarios ***********/

 router.get( '/',validateJWT,getUsers);

 router.get( '/index',validateJWT,getInfo);

 module.exports = router;