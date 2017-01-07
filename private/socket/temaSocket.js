var temaService = require('../service/temaService');
var config = require('../config/config');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.on('unirse', function () {
            socket.join(obtenerNombreRockola());
        });

        socket.on('actualizame', function () {
            obtenerNombreRockola()
                    .then(temaService.obtenerTemas)
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
            return new Promise(function (exito, rechazar) {
                if (socket.handshake.session.cliente && socket.handshake.session.cliente.nombre
                        && socket.handshake.session.cliente.rockola) {
                    exito(socket.handshake.session.cliente.rockola);
                } else {
                    exito("RockolaPNT");
                }
            });
        }

        function obtenerUsuario() {
            if (socket.handshake.session.cliente && socket.handshake.session.cliente.nombre
                    && socket.handshake.session.cliente.rockola) {
                return socket.handshake.session.cliente.nombre;
            } else
                return config.nombreUsuarioAnonimo;
        }
    });
};

