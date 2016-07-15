$(document).ready(function(){

  var socket = io();

  $('#js-boton-enviar').on('click', function(){
    socket.emit('agregarTema', $('#busqueda').val());
  });

  socket.on('teRespondo', function(msg) {
    console.log(msg);
  });

});
