$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproductor").html(html);

        $(".lista-de-temas .collection-item").first().find("p").css("color", "mediumaquamarine");
        $(".lista-de-temas .collection-item").first().find("p").last().append("Reproduciendo");

    }
    
    var nombreRockola = getCookie("rockola");
    socket.emit('actualizame', nombreRockola);

    socket.on('actualizarLista', function (docs) {
        actualizarListaTemas(docs);
    });


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});
