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
const { register, login, renew, update, upload, getImage } = require('../controllers/AuthController');
const { validateJWT } = require('../middlewares/validate-jwt');
const multipart = require('connect-multiparty');
const { filedata } = require('../middlewares/filedata');
const md_upload = multipart({ uploadDir:'./uploads/users'})

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

/********************************Upload Imagen *****************/

router.post(
    '/upload', 
    [
        validateJWT,
        md_upload, 
        filedata
    ], 
    upload
);

/********************************Get Imagen ********************/

router.get(
    '/image/:filename',
    getImage
)


module.exports = router;