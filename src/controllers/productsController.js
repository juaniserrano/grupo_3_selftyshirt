const path= require('path');

const productsController = {
    cart: (req, res) => {
        return res.render(path.join(__dirname, '../views/products/productCart.ejs'));
    },
    detail: (req, res) => {
        return res.render(path.join(__dirname, '../views/products/productDetail.ejs'));
    }
};

// Acá exportamos el resultado
module.exports = productsController;