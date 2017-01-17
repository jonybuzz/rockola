var RockolaModel = require("../model/Rockola.model.js").RockolaModel;
var UsuarioModel = require("../model/Usuario.model.js").UsuarioModel;

var agregarRockola = function (req, success, error) {
    var usuario = req.user;

    RockolaModel.findOne({nombre: req.body.nombreRockola}, function (err, rockola) {
        if (rockola) {
            var rockolasUsuario = usuario.rockolas.filter(function (rockola) {
                return rockola.nombre === req.body.nombreRockola;
            });

            if (rockolasUsuario.length === 0) {
                usuario.rockolas.push({nombre: req.body.nombreRockola, temas: []})
                usuario.save(function (err, result) {
                    if (result)
                        success(result);
                    if (err)
                        console.log(err.message);
                });

            } else {
                error("Ya estás unido a esta Rockola");
            }
        } else {
            error("No existe la rockola seleccionada");
        }
    });

};


module.exports.agregarRockola = agregarRockola;