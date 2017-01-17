var express = require('express');
var routerRockola = express.Router();
var rockolaService = require('../private/service/rockolaService');
var usuarioService = require('../private/service/usuarioService');

routerRockola.put('/', function (req, res) {
    rockolaService.initRockola(req.body.nombreRockola)
            .then(function (rockola) {
                req.session.passport.rockola = rockola.nombre;
                res.status(201).send(rockola);
            });
});

routerRockola.post('/existe', function (req, res) {
    rockolaService.existeRockola(req.body.nombreRockola)
            .then(function (rockola) {
                res.status(200).send({existe: rockola});
            });
});

routerRockola.post('/ingresa', function (req, res) {
    req.session.passport.rockola = req.body.nombreRockola;

    if (req.session.passport.user) {
        usuarioService.agregarRockola(req, function (result) {
            res.status(201).send(result);
        }, function (msjError) {
            res.status(204).send(msjError);
        });
    } else {
        req.session.passport.nombre = "Anonimo";
        res.status(201).send();
    }
});

routerRockola.get('', function (req, res) {
    rockolaService.obtenerRockolas()
            .then(function (rockolas) {
                res.status(200).json({rockolas: rockolas});
            });
});

module.exports = routerRockola;