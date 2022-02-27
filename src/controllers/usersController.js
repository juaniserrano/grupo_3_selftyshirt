const usersController = {
	login: (req, res) => {
		res.render('users/login');
	},
	register: (req, res) => {
		res.render('users/register');
	},
};

// Acá exportamos el resultado
module.exports = usersController;
