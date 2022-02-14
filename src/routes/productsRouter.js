const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');


router.get('/productCart', productsController.cart);
router.get('/productDetail', productsController.detail);

module.exports = router;