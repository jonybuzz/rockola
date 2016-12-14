var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login');
});

router.get('/reproductor', function (req, res) {
    res.render('reproductor');
});

router.get('/cliente', function (req, res, next) {
    res.render('cliente');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

router.get('/perfil', function (req, res, next) {
    res.render('perfil');
});


module.exports = router;
