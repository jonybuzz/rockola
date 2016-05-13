rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        $("#js-boton-enviar").on("click", enviarTema)
    }

    function enviarTema(event) {
        event.preventDefault();
        var urlTema = $("#link-tema").val();
        var tokens = urlTema.split("=");

        if (tokens[0].includes("www.youtube.com/watch?v")) {
            var videoId = tokens[1];

            rockola.service.tema.obtenerDatos(videoId)
                    .done(obtenerNombreSuccess);
        } else {
            alert("La URL no es válida");
        }
    }

    function obtenerNombreSuccess(data) {

        if (data.pageInfo.totalResults === 0) {
            alert('No existe el video!!');
        }

        var nombreUsuario = getCookie("rockolito");
        var videoId = data.items[0].id;
        var titulo = data.items[0].snippet.title;
        var urlThumbnail = data.items[0].snippet.thumbnails.default.url;

        rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail,nombreUsuario)
                .done(obtenerRespuestaDelServidor)
                .fail(mostrarErrorServicioTema);
        obtenerLista();
    }
    function mostrarErrorServicioTema() {
        alert("ERROR con el servicio de Tema");
    }

    function obtenerRespuestaDelServidor(respuesta) {
        $("#link-tema").val("");
        if (respuesta.agregado == false) {
            alert("Ingresá la url completa, con youtube!");
        }
    }

    function obtenerLista() {
        rockola.service.tema.obtenerLista()
                .done(actualizarListaTemas)
                .fail(mostrarErrorServicioTema)
    }

    function actualizarListaTemas(lista) {
        var html = $("#bodyListaTemplate").render(lista.temas);
        $("#body-lista-reproduccion").html(html);
    }

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

    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});
