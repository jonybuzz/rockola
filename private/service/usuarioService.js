var RockolaModel = require("../model/Rockola.model.js");

var agregarRockola = function (req, success, error) {

    RockolaModel.findOne({nombre: req.body.nombreRockola}, function (err, rockolaEncontrada) {
        if (rockolaEncontrada) {

            var usuariosCoincidentesDeRockola = rockolaEncontrada.usuarios.filter(function (idUsuario) {
                return idUsuario.equals(req.user._id);
            });

            if (usuariosCoincidentesDeRockola.length === 0) {
                rockolaEncontrada.usuarios.push(req.user._id);
                rockolaEncontrada.save(function (err, result) {
                    if (result)
                        success(result);
                    if (err)
                        console.log(err.message);
                });
            }
            
        } else {
            error("No existe la rockola seleccionada");
        }
    });
    
};


module.exports.agregarRockola = agregarRockola;