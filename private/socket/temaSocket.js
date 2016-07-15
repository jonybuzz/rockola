var temaService = require('../service/temaService');


module.exports = function(io){

  io.on('connection', function(socket){

    socket.on('agregarTema', function(tema){
      temaService.agregarTema(tema, function(err,doc) {
          temaService.obtenerTemas(function(err, docs){
              io.emit('actualizarLista', docs[0].temas);
          })
      });
    });

  });

}
