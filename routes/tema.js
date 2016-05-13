var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');

routerA.route('/agregar').post(function(req,res){
    console.log(req.body);
    res.json({ agregado: temaService.agregarTema(req.body.temaUrl)});
});

routerA.route('/todos').get(function(req,res,next){
    temaService.obtenerTemas(res);
});

module.exports = routerA;
