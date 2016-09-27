var temaService = require('../service/temaService');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('unirse', function (nombreRockola) {
            socket.join(nombreRockola);
        });

        socket.on('unirse-reproductor', function () {
            socket.join(socket.handshake.session.rockola);
        });

        socket.on('actualizame', function (nombreRockola) {
            temaService.obtenerTemas(socket.handshake.session.rockola)
                    .then(emitirListaDesdeRockola);
        });

        socket.on('agregarTema', function (tema, nombreRockola) {
            temaService.agregarTema(tema, socket.handshake.session.rockola)
                    .then(emitirActualizarLista);
        });

        function emitirActualizarLista(canalYTemas) {
            io.sockets.in(canalYTemas.canal).emit('actualizarLista', canalYTemas.temas);
        }

        function emitirListaDesdeRockola(rockola) {
            io.sockets.in(rockola.nombre).emit('actualizarLista', rockola.temas);
        }

    });
};

