const path= require('path');

const usersController = {
    login: (req, res) => {
        res.render(path.join(__dirname, '../views/users/login.ejs'));
    },
    register: (req, res) => {
        res.render("users/register");
    }
};

// Acá exportamos el resultado
module.exports = usersController;