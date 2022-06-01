const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {Op} = require('sequelize');
const moment = require('moment');

const Users = db.User;
//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const userAPIController = {
    list: (req, res) => {
        Users.findAll().then((user) => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: user.name,
                    url: 'api/users',
                    quantity: user.length,
                },
                data: user,
            };
            res.json(respuesta);
        });
    },
};

module.exports = userAPIController;
