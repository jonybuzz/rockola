/* global module */

var temaService = require('../service/temaService');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('actualizame', function (nombreRockola) {
            temaService.obtenerTemas(nombreRockola, function (err, docs) {
                io.emit('actualizarLista', docs[0].temas);
            });
        });

        socket.on('agregarTema', function (tema, nombreRockola) {
            temaService.agregarTema(tema, nombreRockola, function (err, doc) {
                temaService.obtenerTemas(nombreRockola, function (err, docs) {
                    io.emit('actualizarLista', docs[0].temas);
                });
            });
        });

    });

};
