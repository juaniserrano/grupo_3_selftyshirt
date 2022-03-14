const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

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
			id: uniqid('user-'),
			...req.body,
			newsletter: true,
			category: 'user',
			cartProducts: {},
			image: 'default-avatar.jpg',
		};
		users.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
		res.redirect('/users/profile/' + newUser.id);
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
