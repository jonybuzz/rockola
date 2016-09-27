var express = require('express');
var routerB = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerB.put('/', function (req, res) {
    req.session.reproductor = {};
    rockolaService.initRockola(req.body.nombreRockola)
            .then(function (rockola) {
                req.session.reproductor.rockola = rockola.nombre;
                res.status(201).send(rockola);
            });
});

routerB.post('/existe', function (req, res) {
    req.session.reproductor = {};
    rockolaService.existeRockola(req.body.nombreRockola)
            .then(function (rockola) {
                res.status(200).send({existe: rockola});
            });
});

routerB.post('/ingresa', function (req, res) {
    req.session.cliente = {};
    req.session.cliente.guest = req.body.nombreUsuario;
    req.session.cliente.rockola = req.body.nombreRockola;
});

module.exports = routerB;