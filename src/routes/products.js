// ************ Require's ************
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

//Validaciones con express-validator
const validateCreateForm = [
	body('name').notEmpty().withMessage('Debes completar el campo de Nombre'),
	body('price').notEmpty().withMessage('Debes completar el campo de Precio'),
	body('stockquantity').notEmpty().withMessage('Debes completar el campo de Stock'),
	body('category').notEmpty().withMessage('Debes seleccionar una categoria'),
	body('description').notEmpty().withMessage('Debes completa el campo Descripcion'),
];

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);
router.get('/cart', productsController.cart);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/', validateCreateForm, productsController.store);

module.exports = router;
