const fs = require('fs');
const path = require('path');
const db = require('../database/models');
var uniqid = require('uniqid');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function setImgDefault(product) {
	if (product.category === 'socks') {
		product.image = 'image-default-socks.jpg';
	}
	if (product.category === 'hoodie') {
		product.image = 'image-default-hoodie.jpg';
	}
	if (product.category === 'tshirt') {
		product.image = 'image-default-tshirt.jpg';
	}
}

const controller = {
	// Root - Show all products
	// index: (req, res) => {
	// 	res.render('products/productList', {
	// 		products,
	// 		toThousand,
	// 	});
	// },
	index: (req, res) => {
        db.Product.findAll()
            .then(products => {
                res.render('proucts/productsList.ejs', {products})
            })
    },
	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let product = products.find((product) => product.id == id);
		res.render('products/productDetail', {
			product,
			toThousand,
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('products/productCreate');
	},

	// Create -  Method to store
	store: (req, res) => {
		let newProduct = {
			id: uniqid('product-'),
			image: '',
			...req.body,
		};
		if (!req.file) {
			console.log('No file received');
			setImgDefault(newProduct);
		} else {
			newProduct.image = req.file.filename;
		}
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products/detail/' + newProduct.id);
	},

	cart: (req, res) => {
		res.render('products/productCart');
	},
	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find((product) => product.id == id);
		res.render('products/productEdit', { productToEdit });
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find((product) => product.id == id);

		productToEdit.name = req.body.name;
		productToEdit.description = req.body.description;
		productToEdit.price = req.body.price;
		productToEdit.discount = req.body.discount;
		productToEdit.stockquantity = req.body.stockquantity;
		if (!req.file) {
			console.log('No file received');
		} else {
			productToEdit.image = req.file.filename;
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products/detail/' + productToEdit.id);
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter((product) => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	},
};

// Acá exportamos el resultado
module.exports = controller;
