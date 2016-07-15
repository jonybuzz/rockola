module.exports = function(io){

  io.on('connection', function(socket){

    socket.on('logueo', function(msg){
      console.log('Ingreso: ' + msg);
    });

  });

}
