$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproductor").html(html);
        $("#body-lista-reproductor").prepend('<li><h3 class="center">Lista de Temas</h3></li>');
        
        $('.tooltipped').tooltip({delay: 30});
        
        var itemReproduciendo = $(".lista-de-temas .collection-item").first();
        itemReproduciendo.css("color", "white");
        itemReproduciendo.find("span").css("color", "purple");
        itemReproduciendo.find("span").css("font-weight", "bold");
        itemReproduciendo.find("span").last().append("Reproduciendo");

    }
    
    socket.emit('actualizame');

    socket.on('actualizarLista', actualizarListaTemas);

});
