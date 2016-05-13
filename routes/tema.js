var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');

routerA.route('/agregar').post(function(req,res){
    res.json({ agregado: temaService.agregarTema(req.body.temaUrl)});
});

module.exports = routerA;
