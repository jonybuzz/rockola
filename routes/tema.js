var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');


routerA.route('/siguiente').get(function (req, res, next) {
    temaService.obtenerSiguiente(req, res);
});


routerA.route('/obtenerPrimerTema').get(function (req, res) {
    temaService.obtenerPrimerTema(req, res);
});


module.exports = routerA;
