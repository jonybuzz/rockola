var temaService = require('../service/temaService');
var config = require('../config/config');

module.exports = function (io) {

    io.on('connection', function (socket) {

        if (socket.handshake.session.passport && socket.handshake.session.passport.rockola) {
            socket.join(socket.handshake.session.passport.rockola);
        }else{
            console.log("No se pudo conectar a la rockola");
        }
        
        socket.on('actualizame', function () {
            temaService.obtenerTemas(socket.handshake.session.passport.rockola)
                    .then(emitirListaDesdeRockola);
        });

        socket.on('agregarTema', function (tema) {
            tema.nombreUsuario = socket.handshake.session.passport.nombre;
            temaService.agregarTema(tema, socket.handshake.session.passport.rockola)
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

