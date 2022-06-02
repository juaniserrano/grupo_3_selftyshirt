const {check, body} = require('express-validator');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const db = require('../src/database/models');

const User = db.User;

function findAll() {
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/usersDataBase.json')));
    console.log(users);
    return users;
}

function findAllinDb() {
    return User.findAll();
}

const validator = {
    login: [check('email').notEmpty().withMessage('Campo email vacio'), check('password').notEmpty().withMessage('Campo password vacio')],
    register: [
        check('email')
            .notEmpty()
            .withMessage('Email vacio')
            .bail()
            .isEmail()
            .withMessage('Formato de email incorrecto')
            .bail()
            .custom(async function (value) {
                let users = await findAllinDb();
                // //busco al usuario
                let userFound = users.find(function (user) {
                    return user.email == value;
                });
                // //si existe un usuario devuelvo el error
                if (userFound) {
                    throw new Error('Email ya registrado!');
                }
                // //sino devuelvo true
                return true;
            }),
        check('first_name').notEmpty().withMessage('Campo Nombre vacio').isLength({min: 2}).withMessage('El Nombre debe contener al menos 2 caracteres'),
        check('last_name').notEmpty().withMessage('Campo Apellido vacio').isLength({min: 2}).withMessage('El Apellido debe contener al menos 2 caracteres'),
        check('password').notEmpty().withMessage('campo Password vacio').isLength({min: 8}).withMessage('La contraseña debe contener al menos 8 caracteres'),
    ],
    newProduct: [check('name').notEmpty().withMessage('Campo Nombre vacio').isLength({min: 5}).withMessage('El Nombre debe contener al menos 5 caracteres').bail(), check('description').notEmpty().withMessage('Campo Descripción vacio').isLength({min: 20}).withMessage('La Descripción debe contener al menos 20 caracteres').bail(), check('price').notEmpty().withMessage('Campo Precio vacio').isNumeric().withMessage('El Precio debe ser un número').bail()],
};

module.exports = validator;
