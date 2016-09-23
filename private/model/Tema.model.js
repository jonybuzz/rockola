var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemaSchema = new Schema({
    videoId: String,
    titulo: String,
    thumbnail: String,
    nombreUsuario: String
});

var TemaModel = mongoose.model('Tema', TemaSchema);

module.exports.TemaModel = TemaModel;
module.exports.TemaSchema = TemaSchema;
