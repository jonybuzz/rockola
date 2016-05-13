rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        $("#js-boton-enviar").on("click", enviarTema)
    }

    function enviarTema(event) {
        event.preventDefault();
        var urlTema = $("#link-tema").val();

        var tokens = urlTema.split("=");
        var videoId = tokens[1];
        
        rockola.service.tema.obtenerNombre(videoId)
                .done(obtenerNombreSuccess);

    }

    function obtenerNombreSuccess(data){
        
        if(data.pageInfo.totalResults === 0){
            alert('No existe el video!!');
        }
        
        var videoId = data.items[0].id;
        var titulo = data.items[0].snippet.title;
        var urlThumbnail = data.items[0].snippet.thumbnails.default.url;
        
        rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail)
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

    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});