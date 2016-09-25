/* global module */

var temaService = require('../service/temaService');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('unirse', function (nombreRockola) {
            socket.join(nombreRockola);
        });

        socket.on('actualizame', function (nombreRockola) {
            temaService.obtenerTemas(nombreRockola, function (err, docs) {
                io.sockets.in(nombreRockola).emit('actualizarLista', docs[0].temas);
            });
        });

        socket.on('agregarTema', function (tema, nombreRockola) {
            temaService.agregarTema(tema, nombreRockola, function (doc) {
                    io.sockets.in(nombreRockola).emit('actualizarLista', doc.temas);
            });
        });

    });

};
