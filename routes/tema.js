var express = require('express');
var routerA = express.Router();
var temaService = require('../private/service/temaService');

routerA.route('/agregar').post(function(req,res){
});

routerA.route('/todos').get(function(req,res,next){
    res.status(200).send();
});

routerA.route('/siguiente').get(function(req,res,next){
    temaService.obtenerSiguiente(res);
});


routerA.route('/obtenerPrimerTema').get(function(req,res){
    temaService.obtenerPrimerTema(res);
});


module.exports = routerA;
