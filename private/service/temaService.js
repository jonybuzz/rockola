var databaseUrl = "rockola";
var collections = ["rockola"];
var db = require("mongojs")(databaseUrl, collections);

var agregarTema = function (videoId, titulo, thumbnail) {
    db.rockola.update(
            {nombre: "RockolaPNT"},
            {
                $push: {
                    temas: {
                        videoId: videoId,
                        titulo: titulo,
                        thumbnail: thumbnail
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
        if (docs !== undefined) {
            temas = docs[0].temas;
            res.json({temas: temas});
        } else
            res.json({temas: []});
    });
};

var obtenerSiguiente = function (res) {
    var tema;
    return db.rockola.find({nombre: "RockolaPNT"}, function (err, docs) {
        tema = docs[0].temas[0];
        if (tema !== undefined) {
            res.json({tema: tema});
            db.rockola.update(
                    {nombre: "RockolaPNT"},
                    {
                        $pull: {
                            temas: {
                                videoId: tema.videoId
                            }
                        }
                    }
            );
        } else
            res.json({tema: {}});
    });

};

module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerSiguiente = obtenerSiguiente;