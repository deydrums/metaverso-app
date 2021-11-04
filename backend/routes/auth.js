/**
 * 
 * Routas de Usuarios / Auth
 * host + /api/auth
 *  
 * */ 

const {Router} = require('express');
const router = Router();
const { register } = require('../controllers/AuthController');

 
router.post('/register',register);

module.exports = router;