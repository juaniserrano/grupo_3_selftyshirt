const {validationResult} = require('express-validator');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const User = db.User;

// function writeFile(array){
//     const arrayString = JSON.stringify(array, null, 4)
//     fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayString);
// }

//const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function capitalizeFirstLetter(names) {
    return names
        .split(' ')
        .map((name) => name[0].toUpperCase() + name.substring(1))
        .join(' ');
}

function writeFile(array) {
    let string = JSON.stringify(array, null, 4);
    fs.writeFileSync(path.join(__dirname, '../data/usersDataBase.json'), string);
}

const usersController = {
    login: (req, res) => {
        res.render('users/login');
    },
    register: (req, res) => {
        res.render('users/register');
    },

    //if(req.body.remember != undefined){
    //	res.cookie('remember', usuarioALoguearse.email, { maxAge: 60000 })
    //}
    // Create -  Method to user
    create: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let newUser = {
                first_name: capitalizeFirstLetter(req.body.first_name),
                last_name: capitalizeFirstLetter(req.body.last_name),
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10), // Hasheo de password - Encrypt password
                image: req.file ? req.file.filename : 'default-avatar.jpg',
                address: req.body.address,
                role_id: '1',
            };
            // users.push(newUser);
            // writeFile(users);

            let userCreated = await User.create(newUser);
            res.redirect('/');
        } else {
            res.render('users/register', {errors: errors.array(), old: req.body});
        }
    },
    processLogin: async (req, res) => {
        const errors = validationResult(req);
        if (errors.errors.length > 0) {
            res.render('users/login', {errorsLogin: errors.mapped()});
        }
        const userFound = await User.findOne({where: {email: req.body.email}});
        if (userFound) {
            let user = {
                id: userFound.id,
                first_name: userFound.first_name,
                last_name: userFound.last_name,
                image: userFound.image,
                category: userFound.category,
                email: userFound.email,
                role_id: userFound.role_id,
            };
            let isPasswordCorrect = bcrypt.compareSync(req.body.password, userFound.password);
            if (isPasswordCorrect) {
                req.session.user = user;
                req.session.usuarioLogueado = user;

                if (req.body.remember) {
                    res.cookie('user', user.id, {maxAge: 60000 * 24});
                }

                res.redirect('/users/profile/' + user.id);
            } else {
                res.render('users/login', {errorMsg: 'Error credenciales invalidas!'});
            }
        } else {
            res.render('users/login', {errorMsg: 'Error usuario no encontrado!'});
        }
    },
    // Eliminar un usuario
    destroy: function (req, res) {
        if (req.session.user) {
            req.session.destroy();
        }
        let userId = req.params.id;
        User.destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.redirect('/?userDeleted=true');
            })
            .catch((error) => res.send(error));

        // let id = req.params.id;
        // let finalUsers = users.filter((user) => user.id != id);
        // fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
        // res.redirect('/');
    },

    profile: async function (req, res) {
        let id = req.params.id;
        let user = await User.findOne({where: {id: id}});
        console.log(user);
        res.render('users/userDetail', {
            user,
        });
    },

    edit: (req, res) => {
        User.findByPk(req.params.id).then((user) => {
            res.render('users/userEdit', {userToEdit: user});
        });
    },

    // Update - Method to update
    update: async (req, res) => {
        let userId = req.params.id;
        User.update(
            {
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                newsletter: req.body.newsletter,
                // if (!req.file) {
                // 	console.log('No file received');
                // } else {
                // 	userToEdit.image = req.file.filename;
            },
            {
                where: {id: [userId]},
            }
        ).then(() => {
            res.redirect('/users/profile/' + userId);
        });
    },
    list: function (req, res) {
        res.render('users/userList', {
            users,
        });
    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/');
    },
};

// Acá exportamos el resultado
module.exports = usersController;
