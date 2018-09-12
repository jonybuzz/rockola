var TemaModel = require("../model/Tema.model").TemaModel;
var RockolaModel = require("../model/Rockola.model");
var mezclador = require('../utils/mezclador');
var xss = require('xss');

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

function obtenerPrimerTema(cookie) {
    var nombreRockola = cookie;
    return new Promise(function (exito, rechazar) {
        RockolaModel.findOne({nombre: nombreRockola})
                .then(obtenerPrimerTemaDeRockola)
                .then(exito)
                .catch(rechazar);
    });
}

function obtenerPrimerTemaDeRockola(rockola) {
    return new Promise(function (exito, rechazar) {
        exito(rockola.temas[0]);
    });
}

function obtenerSiguiente(nombreCookie) {
    return new Promise(function (exito, rechazar) {
        RockolaModel.findOne({nombre: nombreCookie})
                .then(function (rockola) {
                    var tema = rockola.temas[0];
                    if (tema !== undefined && tema.videoId !== undefined) {
                        rockola.temas = rockola.temas.filter(function (elem) {
                            return elem.videoId !== tema.videoId;
                        });
                        rockola.temasHistoricos.push(tema);
                        rockola.save().then(function (rockola) {
                            var temaActual = rockola.temas[0];
                            if (temaActual !== undefined) {
                                exito(temaActual);
                            }
                        });
                    }
                });
    });
}

module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerPrimerTema = obtenerPrimerTema;
module.exports.obtenerSiguiente = obtenerSiguiente;
