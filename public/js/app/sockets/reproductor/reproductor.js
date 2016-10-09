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
    
    var nombreRockola = getCookie("rockola");
    socket.emit('unirse', nombreRockola);

    socket.emit('actualizame', nombreRockola);
    
    socket.on('actualizarLista', actualizarListaTemas);


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
