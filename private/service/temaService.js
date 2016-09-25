//var databaseUrl = "mongodb://rockola:deb0d3f9c3e6e1fc0b8792c1a10f69538256978afd7e9c95b6ca2227a8de781d@localhost:27017/rockola?authSource=admin";
var databaseUrl = "mongodb://localhost:27017/rockola";
var xss = require('xss');
var TemaModel = require("../model/Tema.model.js").TemaModel;
var RockolaModel = require("../model/Rockola.model.js");
var mongoose = require('mongoose');
var mezclador = require('../utils/mezclador');

mongoose.connect(databaseUrl);
var bluebird = require('bluebird');
mongoose.Promise = bluebird;

function agregarTema(tema, nombreRockola) {

    var temaNuevo = new TemaModel({
        videoId: tema.videoId,
        titulo: tema.titulo,
        thumbnail: tema.thumbnail,
        nombreUsuario: xss(tema.nombreUsuario)
    });
    return insertarOrdenado(temaNuevo, nombreRockola);
}

function insertarOrdenado(temaNuevo, nombreRockola) {
    return new Promise(function (exito, rechazar) {
        RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
            rockola.temas.push(temaNuevo);
            var arrayTemas = rockola.temas;
            arrayMezclado = mezclador(arrayTemas);
            rockola.temas = arrayMezclado;
            rockola.save()
                    .then(obtenerListaReproduccion)
                    .then(exito)
                    .catch(rechazar);
        });
    });
}

function obtenerListaReproduccion(rockola) {
    return new Promise(function (exito, rechazar) {
        var canalYTemas = {};
        canalYTemas.canal = rockola.nombre;
        canalYTemas.temas = rockola.temas;
        exito(canalYTemas);
    });
}

function obtenerTemas(nombreRockola) {
    return new Promise(function (exito, rechazar) {
        RockolaModel.findOne({nombre: nombreRockola})
                .then(exito)
                .catch(rechazar);

    });
}

function obtenerPrimerTema(req, res) {
    var tema;
    var nombreRockola = req.cookies.rockola;
    return RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
        tema = rockola.temas[0];
        res.json({tema: tema});
    });

}

function obtenerSiguiente(req, res) {
    var tema;
    var nombreRockola = req.cookies.rockola;
    return RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
        tema = rockola.temas[0];
        if (tema !== undefined && tema.videoId !== undefined) {
            rockola.update(
                    {
                        $pull: {
                            temas: {
                                videoId: tema.videoId
                            }
                        }
                    }, function () {
                var temaActual;
                RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
                    temaActual = rockola.temas[0];
                    res.json({tema: temaActual});
                });

            }
            );
        }
    });
}

module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerPrimerTema = obtenerPrimerTema;
module.exports.obtenerSiguiente = obtenerSiguiente;
