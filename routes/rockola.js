var express = require('express');
var routerRockola = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerRockola.put('/', function (req, res) {
    req.session.reproductor = {};
    rockolaService.initRockola(req.body.nombreRockola)
            .then(function (rockola) {
                req.session.rockola = rockola.nombre;
                res.status(201).send(rockola);
            });
});

routerRockola.post('/existe', function (req, res) {
    req.session.reproductor = {};
    rockolaService.existeRockola(req.body.nombreRockola)
            .then(function (rockola) {
                res.status(200).send({existe: rockola});
            });
});

routerRockola.post('/ingresa', function (req, res) {
    req.session.cliente = {};
    req.session.cliente.nombre = req.body.nombreUsuario;
    req.session.cliente.rockola = req.body.nombreRockola;
    res.status(201).send();
});

routerRockola.post('/ingresa/facebook', function (req, res) {
    req.session.cliente = {};
    console.log(req.user);
    req.session.cliente.nombre = req.user.facebook.name;
    req.session.cliente.rockola = req.body.nombreRockola;
    res.status(201).send();
});

module.exports = routerRockola;