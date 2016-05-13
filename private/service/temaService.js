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
                {upsert:true,safe:false}
        );
        return true;
    }
    return false;
};

var obtenerTemas = function () {

};

var obtenerSiguiente = function () {

};

module.exports.agregarTema = agregarTema;