/* global module */

var RockolaModel = require("../model/Rockola.model.js");

var initRockola = function (nombreRockola, callback) {
    console.log(nombreRockola);
    return RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
        if (rockola === null) {
            var rockolaNueva = new RockolaModel({nombre: nombreRockola});
            rockolaNueva.save(function (err, rockola) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rockola);
                    callback(rockola);
                }
            });
        } else {
            callback(rockola);
        }
    });
};

module.exports.initRockola = initRockola;

