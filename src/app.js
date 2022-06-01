// ************ Require's ************
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const logMiddleware = require('./middlewares/logMiddleware');
var app = express();
var session = require('express-session');
const locals = require('./middlewares/locals.js');
const remember = require('./middlewares/rememberMiddleware');
const cors = require('cors');

const adminMiddleware = require('./middlewares/adminMiddleware');
const userMiddleware = require('./middlewares/userMiddleware');
const guestMiddleware = require('./middlewares/guestMiddleware');
// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/index'); // Rutas main
const productsRouter = require('./routes/products'); // Rutas /products
const usersRouter = require('./routes/users'); // Rutas /users

//Aquí llamo a la ruta de las api de productos
const apiProductsRouter = require('./routes/api/productsAPIRoutes');
//Aquí llamo a la ruta de las api de users
const apiUsersRouter = require('./routes/api/usersAPIRoutes');

// app.use(session({secret: 'Shhh, secreto!!'}));
// ************ Template Engine / View Engine Setup - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

// app.use((req, res, next) => {
//   console.log(req.session)
//   next()
// })

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE

//middlewares custom
app.use(logMiddleware);
app.use(locals);
app.use(remember);
app.use(cors());

app.use('/', mainRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

//Aquí creo la colección de mis recursos de movies (APIs)
app.use('/api/products', apiProductsRouter);
app.use('/api/users', apiUsersRouter);

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// ************ exports app - dont'touch ************
module.exports = app;
