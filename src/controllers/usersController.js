const fs = require('fs');
const path = require('path');

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
	// Create -  Method to user
	create: (req, res) => {
		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			newsletter: true,
			category: 'user',
			cartProducts: {},
			image: 'default-avatar.jpg',
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/');
	},

	// Eliminar un usuario
	destroy: function (req, res) {
		//obtengo todos los usuarios
		let users = findAll();

		//busco el usuario y obtengo su indice
		let userIndex = users.findIndex(function (usuario) {
			return usuario.id == req.params.id;
		});

		//elimino el usuario que busque, pasando su indice
		users.splice(usersIndex, 1);

		//modifico mi base de datos
		writeFile(users);

		//redirecciono al listado de usuarios
		res.redirect('/users/list');
	},
};

// Acá exportamos el resultado
module.exports = usersController;
