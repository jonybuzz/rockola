/* global module */

var databaseUrl = "localhost:27017/rockola";
//var databaseUrl = "localhost:27017/rockola";
var collections = ["rockolas"];
var db = require("mongojs")(databaseUrl, collections);
var xss = require('xss');
var TemaModel = require("../model/Tema.model.js").TemaModel;
var RockolaModel = require("../model/Rockola.model.js");
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/rockola");

var agregarTema = function (tema, callback) {

    var temaNuevo = new TemaModel({
        videoId: tema.videoId,
        titulo: tema.titulo,
        thumbnail: tema.thumbnail,
        nombreUsuario: xss(tema.nombreUsuario)
    });
    insertarOrdenado(temaNuevo, callback);
};

function insertarOrdenado(temaNuevo, callback) {
    RockolaModel.findOne({nombre: "RockolaPNT"}, function (err, rockola) {
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
        RockolaModel.update({nombre: "RockolaPNT"}, {$set: {temas: arrayTemas}}, {upsert: true, safe: false}, callback);
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

var obtenerTemas = function (callback) {
    db.rockolas.find({nombre: "RockolaPNT"}, {temas: true, _id: false}, callback);
};

var obtenerPrimerTema = function (res) {
    var tema;
    return db.rockolas.find({nombre: "RockolaPNT"}, function (err, docs) {
        tema = docs[0].temas[0];
        res.json({tema: tema});
    });

};

var obtenerSiguiente = function (res) {
    var tema;
    return db.rockolas.find({nombre: "RockolaPNT"}, function (err, docs) {
        tema = docs[0].temas[0];
        if (tema !== undefined && tema.videoId !== undefined) {
            db.rockolas.update(
                    {nombre: "RockolaPNT"},
                    {
                        $pull: {
                            temas: {
                                videoId: tema.videoId
                            }
                        }
                    }, function () {
                var temaActual;
                return db.rockolas.find({nombre: "RockolaPNT"}, function (err, docs) {
                    temaActual = docs[0].temas[0];
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
