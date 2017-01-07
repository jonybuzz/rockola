$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproductor").html(html);
        $("#body-lista-reproductor").prepend('<li><a class="subheader"><i class="material-icons">queue_music</i> Listado de Temas</a></li>');
        
        $('.tooltipped').tooltip({delay: 30});
        
        var itemReproduciendo = $(".lista-de-temas .collection-item").first();
        itemReproduciendo.css("color", "white");
        itemReproduciendo.find("span").css("color", "purple");
        itemReproduciendo.find("span").last().append("Reproduciendo");

    }
    
    socket.emit('unirse');

    socket.emit('actualizame');

    socket.on('actualizarLista', actualizarListaTemas);

});
