var express = require('express');
var routerB = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerB.put('/', function (req, res) {
    rockolaService.initRockola(req.body.nombreRockola, function (rockola) {
        res.status(201).send(rockola);
    });
});

module.exports = routerB;