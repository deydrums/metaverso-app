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
const { register, login, renew, update } = require('../controllers/AuthController');
const { validateJWT } = require('../middlewares/validate-jwt');

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

/********************************Renew Token ********************/

router.get('/renew', validateJWT, renew);



/********************************Update  de Usuarios ***********/

router.put(
    '/update',
    [
        validateJWT,
        check('name', 'El nombre no es valido').not().isEmpty(),
        check('email', 'El email no es valido').isEmail(),
        paramsValidator
    ],
    update
);


module.exports = router;