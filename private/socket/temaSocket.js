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
            var promise = temaService.agregarTema(tema, nombreRockola);
            promise.then(fullfilAgregarTema);
        });

        function fullfilAgregarTema(rockola) {
            io.sockets.in(rockola.nombre).emit('actualizarLista', rockola.temas);
        }

    });
};

