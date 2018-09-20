var express = require('express');
var router = express.Router();
var usuarioService = require('../private/service/usuarioService');

router.post('/rockola', function (req, res) {
    usuarioService.agregarRockola(req, function (result) {
        res.status(201).send(result);
    }, function (msjError) {
        res.status(204).send(msjError);
    });
});

router.get('/rockolas', function (req, res) {
    if (req.user) {
        res.json(req.user.rockolas);
    } else {
        res;
    }
});

router.get('/login-facebook', function (req, res) {
    req.session.passport.nombre = req.user.nombre;
    res.redirect('/');
});

router.get('/login-google', function (req, res) {
    req.session.passport.nombre = req.user.nombre;
    res.redirect('/');
});


module.exports = router;