const express = require("express");
const app = express();

const path = require('path');
//app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.static("public"));


let rutaMain = require('./src/routes/mainRouter.js');

let rutaProducts = require('./src/routes/productsRouter.js');

let rutaUsers = require('./src/routes/usersRouter');

//Indico a express que utilizaré un Template Engine
app.set('view engine', 'ejs');

app.set('views', (path.join(__dirname, './src/views')));

app.use('/', rutaMain);
app.use('/', rutaProducts);
app.use('/', rutaUsers);


app.listen(process.env.PORT || 3000, function() {
  console.log('Servidor funcionando');
});



//vistas para renderizar
//app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/views/index.html");
//});

//app.get("/login", (req, res) => {
  //res.sendFile(__dirname + "/views/login.html");
//});

//app.get("/register", (req, res) => {
  //res.sendFile(__dirname + "/views/register.html");
//});

//app.get("/cart", (req, res) => {
  //res.sendFile(__dirname + "/views/productCart.html");
//});

//app.get("/detail", (req, res) => {
  //res.sendFile(__dirname + "/views/productDetail.html");
//});
