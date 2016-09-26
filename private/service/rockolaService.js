/* global module */

var RockolaModel = require("../model/Rockola.model.js");

function initRockola(nombreRockola, callback) {
    return new Promise(function (exito, rechazar) {
        RockolaModel.findOne({nombre: nombreRockola}).then(function (rockola) {
            if (rockola === null) {
                var nuevaRockola = new RockolaModel({nombre: nombreRockola});
                nuevaRockola.save().then(exito).catch(rechazar);
            } else {
                exito(rockola);
            }
        });
    });
}

function existeRockola(nombreRockola) {
    return new Promise(RockolaModel.findOne({nombre: nombreRockola}));
}
;

module.exports.initRockola = initRockola;
module.exports.existeRockola = existeRockola;

