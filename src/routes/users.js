const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const path = require('path');
const validationForm = require('../../validator/validationForm');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/avatar');
	},
	filename: (req, file, cb) => {
		console.log(file);
		const newFilename = 'user-' + Date.now() + path.extname(file.originalname);
		cb(null, newFilename);
	},
});

const upload = multer({ storage });

//VALIDACIONES USUARIO
const validateCreatForm = [
  body('firstName').notEmpty().withMessage('Debes completar el campo con tu nombre'),
  body('lastName').notEmpty().withMessage('Debes completar con tu apellido'),
  body('email').notEmpty().withMessage('Debes ingresar tu email')
]

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/login', validationForm.login, usersController.processLogin)
router.post('/register', upload.single('avatar'), validationForm.register, usersController.create);

/*** GET ONE USER ***/
router.get('/profile/:id', usersController.profile);

router.get('/list', usersController.list);

router.delete('/delete/:id', usersController.destroy);

router.post("/logout", usersController.logout);

module.exports = router;
