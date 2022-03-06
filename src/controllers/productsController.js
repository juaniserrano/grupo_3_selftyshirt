const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function setImgDefault(product) {
	if ((product.image = '' && product.category === 'socks')) {
		product.image = 'image-default-socks.jpg';
	}
	if ((product.image = '' && product.category === 'hoodie')) {
		product.image = 'image-default-hoodie.jpg';
	}
	if ((product.image = '' && product.category === 'tshirt')) {
		product.image = 'image-default-tshirt.jpg';
	}
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products/productList', {
			products,
			toThousand,
		});
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
			image:'',
			...req.body,
		};
		if (req.file.filename.length > 3) {
			newProduct.image = req.file.filename;
		}
		if (req.file.filename.length < 3){
			newProduct.image = 'image-default-tshirt.jpg';
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
		res.render('products/productedit', { productToEdit });
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find((product) => product.id == id);

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
		};
		let newProducts = products.map((product) => {
			if (product.id == productToEdit.id) {
				return (product = { ...productToEdit });
			}
			return product;
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
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
