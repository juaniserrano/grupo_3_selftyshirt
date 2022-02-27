// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);
router.get('/cart', productsController.cart);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/', productsController.store);

module.exports = router;
