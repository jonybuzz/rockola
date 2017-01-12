var express = require('express');
var router = express.Router();
var usuarioService = require('../private/service/usuarioService');

router.post('/rockola', function (req, res) {
    usuarioService.agregarRockola(req, res);
});

router.get('/obtenerRockolas', function (req, res) {
    if (req.user) {
        res.json(req.user.rockolas);
    } else {
        res;
    }
});

router.get('/login-facebook', function (req, res) {
    req.session.passport.nombre = req.user.facebook.name;
    res.redirect('/');
});


module.exports = router;