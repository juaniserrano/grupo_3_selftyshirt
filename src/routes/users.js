const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/register', usersController.create);

/*** GET ONE PRODUCT ***/
router.get('/profile/:id', usersController.profile);

module.exports = router;
