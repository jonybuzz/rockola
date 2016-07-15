$(document).ready(function(){

  var socket = io();

  function actualizarListaTemas(temas) {
    var html = $("#bodyListaTemplate").render(temas);
    $("#body-lista-reproductor").html(html);
  }

  socket.on('actualizarLista', function(docs){
    actualizarListaTemas(docs);
  })

});
