const fs = require("fs");
const path = require("path");

function findAll(){
    let data = fs.readFileSync(path.join(__dirname, "..data/products/json"), "utf-8");
    let productos = JSON.parse(data);
    return productos;
}

//function writeFile(array){
//    let string = JSON.stringify(array, null, 4);
//    fs.writeFileSync(path.join(__dirname, "..data/products/json"), string, "utf-8");
//}

const controller = {
  cart: function (req, res) {
    res.render("products/productCart.ejs");
  },
  detail: (req, res) => {
    res.render("products/productDetail.ejs");
  }
};

// Acá exportamos el resultado
module.exports = controller;
