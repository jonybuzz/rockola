var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');

routerA.route('/todos').get(function (req, res, next) {
    res.status(200).send();
});

routerA.route('/siguiente').get(function (req, res, next) {
    temaService.obtenerSiguiente(req.session.rockola)
            .then(function (tema) {
                res.json({tema: tema});
            });
});

routerA.route('/obtenerPrimerTema').get(function (req, res) {
    temaService.obtenerPrimerTema(req.session.rockola)
            .then(function (tema) {
                res.status(200).json({tema: tema});
            });
});

module.exports = routerA;
