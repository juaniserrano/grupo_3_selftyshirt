const express = require("express");
const app = express();

//const path = require('path');
//app.use(express.static(path.resolve(__dirname, './public')));

app.use(express.static("public"));

let rutaMain = require('./src/routes/mainRouter.js');

let rutaProducts = require('./src/routes/productsRouter');

let rutaUsers = require('./src/routes/usersRouter');

//Indico a express que utilizaré un Template Engine
app.set('view engine', 'ejs');

//app.set('views', './src/views/index.ejs');

app.use('/', rutaMain);
app.use('/productCart', rutaProducts);
app.use('/productDetail', rutaProducts);
app.use('/login', rutaUsers);
app.use('/register', rutaUsers);


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
