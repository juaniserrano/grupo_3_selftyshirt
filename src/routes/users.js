const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');

//VALIDACIONES USUARIO
const validateCreatForm = [
  body('firstName').notEmpty().withMessage('Debes completar el campo con tu nombre'),
  body('lastName').notEmpty().withMessage('Debes completar con tu apellido'),
  body('email').notEmpty().withMessage('Debes ingresar tu email')
]

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/register', validateCreatForm, usersController.create);

/*** GET ONE PRODUCT ***/
router.get('/profile/:id', usersController.profile);

router.get('/list', usersController.list);

router.delete('/delete/:id', usersController.destroy);

module.exports = router;
