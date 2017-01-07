var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session.cliente)
        return next();
    res.redirect('/');
    
}


router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/reproductor',  isAuthenticated, function (req, res) {
    res.render('reproductor');
});

router.get('/cliente', isAuthenticated, function (req, res, next) {
    res.render('cliente');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/perfil', isAuthenticated, function (req, res, next) {
    res.render('perfil');
});


module.exports = router;
