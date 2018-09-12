/* global __dirname */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var routesTema = require('./routes/tema');
var routesRockola = require('./routes/rockola');
var passport = require('passport');
var routesFacebook = require('./routes/facebook');
var routesUsuario = require('./routes/usuario');
var session = require('express-session');
var app = express();
var config = require('./private/config/config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//DATABASE
var mongoose = require('mongoose');
mongoose.connect(config.dbUrl);
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

//SESSION
var expressSession = require('express-session')({
    name: 'sid',
    secret: 'COOKIE_SECRET',
    cookie: {
        maxAge: 60 * 60 * 24 * 30
    },
    resave: false,
    saveUninitialized: false
});
app.use(expressSession);
app.use(session({
    secret: 'RockolaSecret',
    resave: true,
    saveUninitialized: true
}));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

require('./private/config/passport')(passport);
routesFacebook(app, passport);

//ROUTES
app.use('/', routes);
app.use('/api/tema', routesTema);
app.use('/api/rockola', routesRockola);
app.use('/api/usuario', routesUsuario);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports.app = app;
module.exports.session = expressSession;
