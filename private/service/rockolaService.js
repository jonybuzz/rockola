/* global module */

var RockolaModel = require("../model/Rockola.model.js");

var initRockola = function (nombreRockola) {
    return RockolaModel.findOne({nombre: nombreRockola}, function (err, rockola) {
        var rockolaNueva = new RockolaModel({nombre: nombreRockola});
        rockolaNueva.save(function (err) {
            if (err)
                console.log(err);
        });
    });
};

module.exports.initRockola = initRockola;

