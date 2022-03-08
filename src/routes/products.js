// ************ Require's ************
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
// ************ Controller Require ************
const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/products');
	},
	filename: (req, file, cb) => {
		console.log(file);
		const newFilename = 'product-' + Date.now() + path.extname(file.originalname);
		cb(null, newFilename);
	},
});

const upload = multer({ storage }); //se puede poner solamente storage porque tiene el mismo nombre que la variable

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
router.post('/', upload.single('imageproduct'), productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.single('imageproduct'), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);

module.exports = router;
