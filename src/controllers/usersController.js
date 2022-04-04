const { validationResult } = require('express-validator');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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
	create: (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()){
		let newUser = {
			id: uniqid('user-'),
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),  //Encrypt password
			newsletter: true,
			category: 'user',
			cartProducts: {},
			image: 'default-avatar.jpg',
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/users/profile/' + newUser.id);
		} else{
			res.render('users/register', { errors: errors.array(), old : req.body });
		}
	},
	// Eliminar un usuario
	destroy: function (req, res) {
		let id = req.params.id;
		let finalUsers = users.filter((user) => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		res.redirect('/users/list');
	},

	profile: function (req, res) {
		let id = req.params.id;
		let user = users.find((user) => user.id == id);
		res.render('users/userDetail', {
			user,
		});
	},
	list: function (req, res) {
		res.render('users/userList', {
			users,
		})
	}
};

// Acá exportamos el resultado
module.exports = usersController;
