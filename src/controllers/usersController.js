const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
	login: (req, res) => {
		res.render('users/login');
	},
	register: (req, res) => {
		res.render('users/register');
	},
	// Create -  Method to store
	store: (req, res) => {
		let newUser = {
			id: users[users.length - 1].id + 1,
			...req.body,
			image: 'default-avatar.jpg',
			newsletter: true,
			cartProducts: {},
		};
		users.push(newUser);
		fs.writeFileSync(newUsers, JSON.stringify(users, null, ' '));
		res.redirect('/user/profile/' + newUser.id);
	},
};

// Acá exportamos el resultado
module.exports = usersController;
