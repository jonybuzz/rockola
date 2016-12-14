var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RockolaSchema = require('./Rockola.model').RockolaSchema;

var UsuarioSchema = new Schema({
    facebook: {
        id: String,
        name: String
    },
    rockolas: [RockolaSchema]
});

var UsuarioModel = mongoose.model("Usuario", UsuarioSchema);
module.exports = UsuarioModel;
