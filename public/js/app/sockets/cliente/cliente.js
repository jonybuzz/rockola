$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproduccion").html(html);

        $(".lista-de-temas .collection-item").first().find("p").css("color", "mediumaquamarine");
        $(".lista-de-temas .collection-item").first().find("p").last().append("Reproduciendo");

    }

    socket.on('actualizarLista', function (docs) {
        actualizarListaTemas(docs);
    });
});
