var databaseUrl = "rockola";
var collections = ["rockola"];
var db = require("mongojs")(databaseUrl, collections);

var agregarTema = function (videoId, titulo, thumbnail, nombreUsuario) {
    db.rockola.update(
            {nombre: "RockolaPNT"},
            {
                $push: {
                    temas: {
                        videoId: videoId,
                        titulo: titulo,
                        thumbnail: thumbnail,
                        nombreUsuario: nombreUsuario
                    }
                }
            },
            {upsert: true, safe: false}
    );
};

//Nota: Hacer Sincronico este metodo
var obtenerTemas = function (res) {
    var temas;
    return db.rockola.find({nombre: "RockolaPNT"}, function (err, docs) {

        if (docs != undefined && docs.length !== 0) {
            temas = docs[0].temas;
            res.json({temas: temas});
        } else
            res.json({temas: []});
    });
};

var obtenerTemaAReproducir = function (res) {
    var tema;
    return db.rockola.find({nombre: "RockolaPNT"}, function (err, docs) {
        tema = docs[0].temas[0];
        res.json({tema: tema});
    });

};

var obtenerSiguiente = function (res) {
    var tema;
    return db.rockola.find({nombre: "RockolaPNT"}, function (err, docs) {
        tema = docs[0].temas[0];
        db.rockola.update(
                {nombre: "RockolaPNT"},
                {
                    $pull: {
                        temas: {
                            videoId: tema.videoId
                        }
                    }
                }, function () {
            var temaActual;
            return db.rockola.find({nombre: "RockolaPNT"}, function (err, docs) {
                temaActual = docs[0].temas[0];
                res.json({tema: temaActual});
            });

        }
        );
    });
};

var eliminarTema = function (videoId) {
    db.rockola.update(
            {nombre: "RockolaPNT"},
            {
                $pull: {
                    temas: {
                        videoId: videoId
                    }
                }
            }
    );
}

module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerTemaAReproducir = obtenerTemaAReproducir;
module.exports.eliminarTema = eliminarTema;
module.exports.obtenerSiguiente = obtenerSiguiente;
