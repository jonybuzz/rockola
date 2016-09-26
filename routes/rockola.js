var express = require('express');
var routerB = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerB.put('/', function (req, res) {
    rockolaService.initRockola(req.body.nombreRockola)
            .then(function (rockola) {
                res.status(201).send(rockola);
            });
});

routerB.post('/existe', function (req, res) {
    rockolaService.existeRockola(req.body.nombreRockola)
            .then(function (rockola) {
                res.status(200).send({existe: rockola});
            });
});

module.exports = routerB;