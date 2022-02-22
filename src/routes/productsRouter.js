// Acá nos falta express y el router--Listo
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller --listo
const productController = require('../controllers/productsController')

// Acá definimos las rutas --listo
router.get('/cart', productController.cart);
router.get('/detail', productController.detail);
router.get('/products', productController.products);
router.get('/newproduct', productController.create);
router.get('/editproduct', productController.edit);
router.get('/productcart', productController.cart);
// Acá exportamos el resultado
module.exports = router;