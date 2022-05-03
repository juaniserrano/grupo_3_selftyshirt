const { validationResult } = require('express-validator');
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
		console.log(req.body);
		let errors = validationResult(req);
		if (errors.isEmpty()){
		let newUser = {
			first_name: req.body.first_name,
			last_name:  req.body.last_name,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),  // Hasheo de password - Encrypt password
			image: req.file ? req.file.filename : "default-avatar.jpg",
			address: req.body.address,
			role_id: '1'
		};
		// users.push(newUser);
		// writeFile(users);
		
		let userCreated = await User.create(newUser);
		res.redirect('/users/profile/' + userCreated.id);
		} else{
			res.render('users/register', { errors: errors.array(), old : req.body });
		}
	},
	processLogin: async (req, res) => {
		const errors = validationResult(req);
		        if(errors.errors.length > 0){
            res.render("users/login", {errorsLogin: errors.mapped()})
        }
		const userFound = await User.findOne( { where: { email: req.body.email } } )
			if (userFound){
            	let user = {
                	id: userFound.id,
                	name: userFound.first_name,
                	lastName: userFound.last_name,
                	avatar: userFound.avatar,
					category: userFound.category,
					email: userFound.email,
					role_id: userFound.role_id,
            	}
				let isPasswordCorrect = bcrypt.compareSync(req.body.password, userFound.password)
				if (isPasswordCorrect){
					req.session.user = user;
					req.session.usuarioLogueado = user;

				if(req.body.remember){
					res.cookie("user", user.id, {maxAge: 60000 * 24})
				}

				res.redirect("/users/profile/" + user.id);

				}else{
					res.render("users/login", {errorMsg: "Error credenciales invalidas!"})
				}
			}else{
				res.render("users/login", {errorMsg: "Error usuario no encontrado!"})
			}
	},
	// Eliminar un usuario
	destroy: function (req, res) {
		if (req.session.user){
			req.session.destroy();
		}
		let userId = req.params.id;
        User
        .destroy({where: {id: userId}, force: true}) // force: true es para asegurar que se ejecute la acción
        .then(()=>{
            return res.redirect('/?userDeleted=true')})
        .catch(error => res.send(error)) 


		// let id = req.params.id;
		// let finalUsers = users.filter((user) => user.id != id);
		// fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, ' '));
		// res.redirect('/');
	},

	profile: async function (req, res) {
		let id = req.params.id;
		let user = await User.findOne({ where: { id: id } });
		console.log(user);
		res.render('users/userDetail', {
			user,
		});
	},

	edit: (req, res) => {
		let user = User.findOne({ where: { id: req.params.id } })
			res.render('users/userEdit', { userToEdit : user });
	},
	
	// Update - Method to update
	update: async (req, res) => {
		let productId = req.params.id;
        Product.update(
        {
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			discount: req.body.discount,
			stock: req.body.stockquantity,
			category_id: req.body.category,
			// if (!req.file) {
			// 	console.log('No file received');
			// } else {
			// 	productToEdit.image = req.file.filename;
        },
        {
            where: {id: [productId]}
        }).then(() => {
			res.redirect('/products/detail/' + productId);
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
