/**
 * 
 * Routas de Eventos 
 * host + /api/event
 *  
 * */ 

const {Router} = require('express');
const { getEvents, getEvent } = require('../controllers/EventController');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();
 

  /********************************Obtener todos los usuarios ***********/

  router.get( '/',validateJWT,getEvents);

  router.get( '/:id',validateJWT,getEvent);


  module.exports = router;