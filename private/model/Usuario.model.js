var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    nombre: String,
    facebook: {
        id: String
    }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
