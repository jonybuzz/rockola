var temaService = require('../service/temaService');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('unirse', function () {
            socket.join(obtenerNombreRockola());
        });

        socket.on('actualizame', function () {
            temaService.obtenerTemas(obtenerNombreRockola())
                    .then(emitirListaDesdeRockola);
        });

        socket.on('agregarTema', function (tema) {
            tema.nombreUsuario = obtenerUsuario();
            temaService.agregarTema(tema, obtenerNombreRockola())
                    .then(emitirActualizarLista);
        });

        function emitirActualizarLista(canalYTemas) {
            io.sockets.in(canalYTemas.canal).emit('actualizarLista', canalYTemas.temas);
        }

        function emitirListaDesdeRockola(rockola) {
            io.sockets.in(rockola.nombre).emit('actualizarLista', rockola.temas);
        }

        function obtenerNombreRockola() {
            var nombreRockola;
            if (socket.handshake.session.rockola) {
                nombreRockola = socket.handshake.session.rockola;
            } else if (socket.handshake.session.cliente && socket.handshake.session.cliente.nombre
                    && socket.handshake.session.cliente.rockola) {
                nombreRockola = socket.handshake.session.cliente.rockola;
            }
            return nombreRockola;
        }

        function obtenerUsuario() {
            if (socket.handshake.session.cliente && socket.handshake.session.cliente.nombre
                    && socket.handshake.session.cliente.rockola) {
                return socket.handshake.session.cliente.nombre;
            }
        }
    });
};

