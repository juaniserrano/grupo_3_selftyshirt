// Acá nos falta express y el router--Listo
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller --listo
const mainController = require('../controllers/mainController')

// Acá definimos las rutas --listo
router.get('/', mainController.index);

// Acá exportamos el resultado
module.exports = router;