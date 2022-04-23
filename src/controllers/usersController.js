const { validationResult } = require('express-validator');
const req = require('express/lib/request');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function writeFile(array){
    const arrayString = JSON.stringify(array, null, 4)
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), arrayString);
}


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
			password: bcrypt.hashSync(req.body.password, 10),  // Hasheo de password - Encrypt password
			newsletter: true,
			category: req.body.category,
			cartProducts: {},
		avatar: req.file ? req.file.filename : "default-avatar.jpg"
		};
		users.push(newUser);
		writeFile(users);
		res.redirect('/users/profile/' + newUser.id);
		} else{
			res.render('users/register', { errors: errors.array(), old : req.body });
		}
	},
	processLogin: (req, res) => {
		const errors = validationResult(req);
		        if(errors.errors.length > 0){
            res.render("users/login", {errorsLogin: errors.mapped()})
        }
		const userFound = users.find(function(user){
            return user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)
        })
			if (userFound){
            let user = {
                id: userFound.id,
                name: userFound.firstName,
                lastName: userFound.lastName,
                avatar: userFound.avatar,
				category: userFound.category,
            }

			req.session.usuarioLogueado = user;

            if(req.body.remember){
                res.cookie("user", user.id, {maxAge: 60000 * 24})
            }

            res.redirect("/users/profile/" + user.id);

        }else{
            res.render("users/login", {errorMsg: "Error credenciales invalidas!"})
		}
	},
	// Eliminar un usuario
	destroy: function (req, res) {
		let id = req.params.id;
		let finalUsers = users.filter((user) => user.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		res.redirect('/');
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
	},
  logout:function(req, res){
    req.session.destroy();
    res.clearCookie("user");
    res.redirect("/");
}

};

// Acá exportamos el resultado
module.exports = usersController;
