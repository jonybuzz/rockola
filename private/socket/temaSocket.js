var temaService = require('../service/temaService');
var config = require('../config/config');

module.exports = function (io) {

    io.on('connection', function (socket) {

        socket.join(socket.handshake.session.cliente.rockola);

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
                    rechazar("No hay un cliente en la sesion.");
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

