/* global module */

//var databaseUrl = "mongodb://rockola:deb0d3f9c3e6e1fc0b8792c1a10f69538256978afd7e9c95b6ca2227a8de781d@localhost:27017/rockola?authSource=admin";
var databaseUrl = "mongodb://localhost:27017/rockola";
var xss = require('xss');
var TemaModel = require("../model/Tema.model.js").TemaModel;
var RockolaModel = require("../model/Rockola.model.js");
var mongoose = require('mongoose');
mongoose.connect(databaseUrl);

var agregarTema = function (tema, nombreRockola, callback) {

    var temaNuevo = new TemaModel({
        videoId: tema.videoId,
        titulo: tema.titulo,
        thumbnail: tema.thumbnail,
        nombreUsuario: xss(tema.nombreUsuario)
    });
    insertarOrdenado(temaNuevo, nombreRockola, callback);
};

function insertarOrdenado(temaNuevo, nombreRockola, callback) {
    RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
        var arrayTemas = [];
        var indice;
        var listaTemasUsuarios = {};
        var tema = {};
        try {
            arrayTemas = rockola.temas;
        } catch (err) {
        }
        var cantidadDeTemasInsertadosDeUsuario = obtenerTemasDeUsuario(temaNuevo.nombreUsuario, arrayTemas);

        if (arrayTemas.length > 0) {
            for (indice = 0; indice < arrayTemas.length; indice++) {
                tema = arrayTemas[indice];

                if (tema.nombreUsuario in listaTemasUsuarios) {
                    listaTemasUsuarios[tema.nombreUsuario]++;
                } else {
                    listaTemasUsuarios[tema.nombreUsuario] = 1;
                }

                if (temaNuevo.nombreUsuario !== tema.nombreUsuario
                        && listaTemasUsuarios[tema.nombreUsuario] > cantidadDeTemasInsertadosDeUsuario + 1) {
                    break;
                }

            }

            if (indice === arrayTemas.length) {
                arrayTemas.push(temaNuevo);
            } else {
                arrayTemas.splice(indice, 0, temaNuevo);
            }

        } else {
            arrayTemas.push(temaNuevo);
        }
        RockolaModel.update({nombre: nombreRockola}, {$set: {temas: arrayTemas}}, {upsert: true, safe: false}, callback);
    });

}

function obtenerTemasDeUsuario(nombreUsuario, arrayTemas) {
    var cantidad = 0;
    arrayTemas.forEach(function (tema) {
        if (nombreUsuario === tema.nombreUsuario) {
            cantidad++;
        }
    });

    return cantidad;
}

var obtenerTemas = function (nombreRockola, callback) {
    RockolaModel.find({nombre: nombreRockola}, {temas: true, _id: false}, callback);
};

var obtenerPrimerTema = function (res) {
    var tema;
    return RockolaModel.findOne({nombre: "RockolaPNT"}, function (err, rockola) {
        tema = rockola.temas[0];
        res.json({tema: tema});
    });

};

var obtenerSiguiente = function (res) {
    var tema;
    return RockolaModel.findOne({nombre: "RockolaPNT"}, function (err, rockola) {
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
                RockolaModel.findOne({nombre: "RockolaPNT"}, function (err, rockola) {
                    temaActual = rockola.temas[0];
                    res.json({tema: temaActual});
                });

            }
            );
        }
    });
};


module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerPrimerTema = obtenerPrimerTema;
module.exports.obtenerSiguiente = obtenerSiguiente;
