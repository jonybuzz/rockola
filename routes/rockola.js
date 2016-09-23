var express = require('express');
var routerB = express.Router();
var rockolaService = require('../private/service/rockolaService');

routerB.put('/', function (req, res) {
    rockolaService.initRockola(req.cookies.rockola);
    res.status(204).send();
});

module.exports = routerB;