var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');

routerA.route('/agregar').post(function(req,res){
    console.log(req.body);
    res.json({ agregado: temaService.agregarTema(req.body.videoId,req.body.titulo,req.body.thumbnail)});
});

routerA.route('/todos').get(function(req,res,next){
    temaService.obtenerTemas(res);
});

routerA.route('/siguiente').get(function(req,res,next){
    temaService.obtenerSiguiente(res);
});

module.exports = routerA;
