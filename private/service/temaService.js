var databaseUrl = "rockola:deb0d3f9c3e6e1fc0b8792c1a10f69538256978afd7e9c95b6ca2227a8de781d@45.79.204.210:27017/rockola";
var collections = ["rockola"];
var db = require("mongojs")(databaseUrl, collections);

var agregarTema = function (tema, callback) {
    db.rockola.update(
            {nombre: "RockolaPNT"},
            {
                $push: {
                    temas: {
                        videoId: tema.videoId,
                        titulo: tema.titulo,
                        thumbnail: tema.thumbnail,
                        nombreUsuario: tema.nombreUsuario
                    }
                }
            },
            {upsert: true, safe: false}, callback);
};

//Nota: Hacer Sincronico este metodo
var obtenerTemas = function (callback) {
    var temas;
    db.rockola.find({nombre: "RockolaPNT"}, {temas: true, _id: false}, callback);
};

var obtenerPrimerTema = function (res) {
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
        if (tema !== undefined && tema.videoId !== undefined) {
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
        }
    });
};


module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerPrimerTema = obtenerPrimerTema;
module.exports.obtenerSiguiente = obtenerSiguiente;
