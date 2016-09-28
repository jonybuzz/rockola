$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproductor").html(html);
        $(".lista-de-temas .collection-item").first().find("p").css("color", "mediumaquamarine");
        $(".lista-de-temas .collection-item").first().find("p").last().append("Reproduciendo");

    }

    socket.emit('unirse');

    socket.emit('actualizame');

    socket.on('actualizarLista', actualizarListaTemas);

});
