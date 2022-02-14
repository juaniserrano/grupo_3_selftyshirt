
const path= require('path');

const controller = {
    index: function (req,res) {
        return res.render(path.join(__dirname, '../views/index.ejs'));
    }
};

// Acá exportamos el resultado
module.exports = controller;