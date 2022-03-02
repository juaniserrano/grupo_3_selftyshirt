const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function setImgDefault(product) {
	if (product.category === 'socks') {
		product.image = 'image-default-socks.jpg';
	}
	if (product.category === 'hoodie') {
		product.image = 'image-default-hoodie.jpg';
	} else {
		product.image = 'image-default-products.jpg';
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
			id: products[products.length - 1].id + 1,
			...req.body,
			image: 'image-default-product.jpg',
			color: 'orange',
		};
		setImgDefault(newProduct);
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products/detail/' + newProduct.id);
	},

	cart: (req, res) => {
		res.render('products/productCart');
	},
};

// Acá exportamos el resultado
module.exports = controller;
