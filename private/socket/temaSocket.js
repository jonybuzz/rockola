/* global module */

var temaService = require('../service/temaService');

module.exports = function(io){

  io.on('connection', function(socket){

    temaService.obtenerTemas(function(err, docs){
        socket.emit('actualizarLista', docs[0].temas);
    });

    socket.on('actualizame', function (socket) {
      temaService.obtenerTemas(function(err, docs){
          io.emit('actualizarLista', docs[0].temas);
      });
    });

    socket.on('agregarTema', function(tema, nombreRockola){
      temaService.agregarTema(tema, nombreRockola, function(err,doc) {
          temaService.obtenerTemas(nombreRockola, function(err, docs){
              io.emit('actualizarLista', docs[0].temas);
          });
      });
    });

  });

};
