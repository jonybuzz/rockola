module.exports = function(io){

  io.on('connection', function(socket){

    socket.on('agregarTema', function(msg){
      console.log('Agregaron: ' + msg);
    });

  });

}
