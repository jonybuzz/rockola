var express = require('express');
var routerRockola = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerRockola.put('/', function (req, res) {
    rockolaService.initRockola(req.body.nombreRockola)
            .then(function (rockola) {
                req.session.rockola = rockola.nombre;
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
    req.session.cliente = {};
    req.session.cliente.nombre = "Anonimo";
    req.session.cliente.rockola = req.body.nombreRockola;
    res.status(201).send();
});

routerRockola.post('/ingresa/facebook', function (req, res) {
    req.session.cliente.rockola = req.body.nombreRockola;
    res.status(201).send();
});

routerRockola.get('', function (req, res) {
    rockolaService.obtenerRockolas()
            .then(function (rockolas) {
                res.status(200).json({rockolas: rockolas});
            });
});

module.exports = routerRockola;