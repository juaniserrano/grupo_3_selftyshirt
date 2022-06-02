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
        let fullUrl = req.protocol + '://' + req.get('host');
        Users.findAll()
        .then(users => {
            let user = users.map((user) => {
                return {id: user.id, name: user.first_name + " " + user.last_name, email: user.email, detail: `${fullUrl}/users/detail/${user.id}`};
            });
            return res.json({
                count: users.length,
                user
            })
            
        })
        
    },

    detail: (req, res) => {
        let imageUrl = req.protocol + '://' + req.get('host');
        Users.findByPk(req.params.id)
        .then(user => {
            return res.status(200).json({
                data: {
                    id: user.id,
                    name: user.first_name + " " + user.last_name,
                    email: user.email,
                    image: `${imageUrl}/image/avatar/${user.image}`
                }
            });       
        })    
    }
};

module.exports = userAPIController;
