var RockolaModel = require("../model/Rockola.model.js").RockolaModel;

var agregarRockola = function (req, res) {
    var usuario = req.user;

    RockolaModel.findOne({nombre: req.body.nombreRockola}, function (err, rockola) {
        if (rockola) {
            var rockolasUsuario = usuario.rockolas.filter(function (rockola) {
                return rockola.nombre === req.body.nombreRockola;
            });

            if (rockolasUsuario.length === 0) {
                usuario.rockolas.push({nombre: req.body.nombreRockola, temas: []})
                usuario.save(function (err, result) {
                    res.status(201).send(result);
                });
            } else {
                res.status(204).send("Ya estás unido a esta Rockola");
            }
        } else {
            res.status(204).send("No existe la rockola seleccionada");
        }
    });

};


module.exports.agregarRockola = agregarRockola;