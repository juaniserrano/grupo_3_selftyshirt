const path= require('path');

const usersController = {
    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    },
    register: (req, res) => {
        res.render(path.join(__dirname, '../views/users/register.ejs'));
    }
};

// Acá exportamos el resultado
module.exports = usersController;