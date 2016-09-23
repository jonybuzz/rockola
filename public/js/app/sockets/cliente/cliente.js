$(document).ready(function () {

    var socket = io();

    function actualizarListaTemas(temas) {
        var html = $("#bodyListaTemplate").render(temas);
        $("#body-lista-reproduccion").html(html);

        var itemReproduciendo = $(".lista-de-temas .collection-item").first();
        itemReproduciendo.find("span").last().css("color", "mediumaquamarine");
        itemReproduciendo.find("span").last().append("Reproduciendo");
    }

    var nombreRockola = getCookie("rockola");
    
    socket.emit('unirse', nombreRockola);
    socket.emit('actualizame', nombreRockola);

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

    socket.on('actualizarLista', function (docs) {
        actualizarListaTemas(docs);
    });
});
