$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproduccion").html(html);

        var itemReproduciendo = $(".lista-de-temas .collection-item").first();
        itemReproduciendo.find("span").last().css("color", "mediumaquamarine");
        itemReproduciendo.find("span").last().append("Reproduciendo");
    }

    socket.emit('unirse');
    socket.emit('actualizame');

    socket.on('actualizarLista', function (temas) {
        actualizarListaTemas(temas);
    });
});
