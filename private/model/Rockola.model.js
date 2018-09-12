var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TemaSchema = require('./Tema.model').TemaSchema;

var RockolaSchema = new Schema({
    nombre: {type: String, unique: true},
    temas: [TemaSchema],
    temasHistoricos: [TemaSchema],
    usuarios: [{type: Schema.Types.ObjectId, ref: 'Usuario'}]
});

module.exports = mongoose.model('Rockola', RockolaSchema);