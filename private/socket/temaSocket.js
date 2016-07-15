module.exports = function(io){

  io.on('connection', function(socket){

    socket.on('agregarTema', function(msg){
      io.emit('teRespondo', "hola soy milleeeeeeeer! aqui!")
      console.log('Agregaron: ' + msg);
    });

  });

}
