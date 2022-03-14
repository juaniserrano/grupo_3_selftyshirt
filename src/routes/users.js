const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/* GET users listing. */
router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/register', usersController.create);

/*** GET ONE PRODUCT ***/
router.get('/profile/:id', usersController.profile);

router.get('/list', usersController.list);

router.delete('/delete/:id', usersController.destroy);

module.exports = router;
