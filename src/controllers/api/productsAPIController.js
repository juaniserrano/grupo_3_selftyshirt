const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize');
const moment = require('moment');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Product = db.Product;
const Actors = db.Actor;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const productsAPIController = {
    list: (req, res) => {
        try {
            let fullUrl = req.protocol + '://' + req.get('host');
            db.Product.findAll({include: [{association: 'category'}]}).then(async (product) => {
                let productToDisplay = product.map((product) => {
                    return {id: product.id, name: product.name, price: product.price, description: product.description, category: product.category.name, detail: `${fullUrl}/products/detail/${product.id}`}; //Formateo los datos para que se muestren de esta forma al hacer el GET
                });

                let queryCategory = await db.Product.findAll({
                    group: 'category_id',
                    include: [{association: 'category'}],
                    attributes: [
                        [sequelize.fn('COUNT', sequelize.col('category_id')), 'contador'],
                        [sequelize.col('category.name'), 'categoria'],
                    ],
                });

                let countByCategory = {};

                queryCategory.forEach((category) => {
                    countByCategory[category.dataValues.categoria] = category.dataValues.contador;
                });

                let respuesta = {
                    meta: {
                        status: 200,
                        url: 'api/product',
                    },
                    data: {
                        count: product.length,
                        countByCategory,
                        products: productToDisplay,
                    },
                };
                res.json(respuesta);
            });
        } catch (error) {
            res.send('error');
        }
    },

    detail: (req, res) => {
        try {
            db.Product.findByPk(req.params.id).then((product) => {
                if (!product) {
                    return res.status(404).json({
                        meta: {
                            status: 404,
                            url: 'api/product',
                        },
                        data: {
                            error: 'Producto no encontrado',
                        },
                    });
                }
                let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/product/:id',
                    },
                    data: product,
                };
                res.json(respuesta);
            });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = productsAPIController;
