/**
 * 
 * Routas de Usuarios / Auth
 * host + /api/auth
 *  
 * */ 

const {Router} = require('express');
const { check } = require('express-validator');
const { paramsValidator } = require('../middlewares/params-validator');
const router = Router();
const { register, login } = require('../controllers/AuthController');

/********************************Registro de Usuarios ***********/

router.post(
    '/register',
    [
        check('name', 'El nombre no es valido').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}), 
        paramsValidator
    ],
    register
);

/********************************Login de Usuarios **************/

router.post(
    '/login',
    [
        check('email', 'El email no es valido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}), 
        paramsValidator
    ],  
    login
);

module.exports = router;