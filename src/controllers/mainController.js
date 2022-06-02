const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const Product = db.Product;

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const controller = {
    index: (req, res, next) => {
        //console.log(req.session.usuarioLogueado)
        res.render('index', {title: 'Inicio'});
    },

    // search: (req, res) => {

    // 	let search = req.query.keywords.toLowerCase();
    // 	let productsToSearch = products.filter((product) => product.name.toLowerCase().includes(search));
    // 	res.render('results', {
    // 		products: productsToSearch,
    // 		search,
    // 		toThousand,
    // 	});
    // },

    search: (req, res) => {
        try {
            let {keywords} = req.query; // Query is sent via url (e.g /products?search=pantalon)

            // Remember to import Op from Sequelize
            Product.findAll({
                where: {
                    [Op.or]: [{name: {[Op.like]: `%${keywords}%`}}, {description: {[Op.like]: `%${keywords}%`}}],
                },
            }).then((products) => {
                return res.render('results', {products, search: req.query.keywords, toThousand}); // Is this route ok?
            });
        } catch (error) {
            console.log(error);
            res.send('An error ocurred :('); // I don't know how to handle this error
        }
    },
};

module.exports = controller;
