var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TemaSchema = require('./Tema.model.js').TemaSchema;

var RockolaSchema = new Schema({
    nombre: {type: String, unique: true},
    temas: [TemaSchema]
});

var RockolaModel = mongoose.model('Rockola', RockolaSchema);

module.exports = RockolaModel;