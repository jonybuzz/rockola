var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
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

module.exports = router;
