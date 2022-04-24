// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller
const mainController = require('../controllers/mainController');

// Acá definimos las rutas
router.get('/', mainController.index);
router.get('/search', mainController.search);

// router.get('/pruebaSession', function(req, res){
//   if (req.session.numeroVisitas == undefined){
//     req.session.numeroVisitas = 0;
//   }
//   req.session.numeroVisitas++;
//   res.send('Sesion tiene el numero:' + req.session.numeroVisitas);
// });

// router.get('/mostarNumero', function(req, res){
// res.send('Sesion tiene el numero:' + req.session.numeroVisitas);
// });

// Acá exportamos el resultado
module.exports = router;
