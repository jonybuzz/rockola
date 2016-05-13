var databaseUrl = "rockola";
var collections = ["rockola"];
var db = require("mongojs")(databaseUrl, collections);

var agregarTema = function (temaUrl) {
    var tokens = temaUrl.split("=");
    var videoId = tokens[1];
    if (tokens[0].includes("www.youtube.com/watch?v") && videoId.length > 10) {
        db.rockola.update(
                {nombre: "RockolaPNT"},
                {
                    $push: {
                        temas: {
                            videoId: videoId
                        }
                    }
                },
                {upsert: true, safe: false}
        );
        return true;
    }
    return false;
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
            res.json({temas: tema});
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
        }
        else res.json({temas: []});
    });

};

module.exports.agregarTema = agregarTema;
module.exports.obtenerTemas = obtenerTemas;
module.exports.obtenerSiguiente = obtenerSiguiente;