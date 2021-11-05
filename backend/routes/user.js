/**
 * 
 * Routas de Usuarios 
 * host + /api/user
 *  
 * */ 

const {Router} = require('express');
const { getUsers } = require('../controllers/UserController');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

 
 /********************************Obtener todos los usuarios ***********/

 router.get( '/',validateJWT,getUsers);


 module.exports = router;