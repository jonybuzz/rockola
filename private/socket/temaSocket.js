var temaService = require('../service/temaService');
var config = require('../config/config');

module.exports = function (io) {

    io.on('connection', function (socket) {

        if (socket.handshake.session.passport.rockola) {
            socket.join(socket.handshake.session.passport.rockola);
        }else{
            console.log("No se pudo conectar a la rockola");
        }
        
        socket.on('actualizame', function () {
            obtenerNombreRockola()
                    .then(temaService.obtenerTemas)
                    .then(emitirListaDesdeRockola);
        });

        socket.on('agregarTema', function (tema) {
            tema.nombreUsuario = obtenerUsuario();
            obtenerNombreRockola()
                    .then(temaService.agregarTema.bind(null, tema))
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
                if (socket.handshake.session.passport.user) {
                    exito(socket.handshake.session.passport.rockola);
                } else {
                    rechazar("No hay un cliente en la sesion.");
                }
            });
        }

        function obtenerUsuario() {
            if (socket.handshake.session.passport.user) {
                return socket.handshake.session.passport.nombre;
            } else
                return config.nombreUsuarioAnonimo;
        }
    });
};

