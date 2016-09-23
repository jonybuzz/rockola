/* global rockola */

rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        bindearTeclaEnter();
        $("#js-buscar-tema").on("click", buscarContenido);
    }
    
    function bindearTeclaEnter(){
        $('.rockola-busqueda').bind("enterKey", function (e) {
            buscarTema();
        });
        $('.rockola-busqueda').keyup(function (e) {
            if (e.keyCode === 13)
            {
                $(this).trigger("enterKey");
            }
        });
    }
    
    
    function buscarContenido(){
        if ($("#busqueda-por-tema").filter(':checked').val() === 'on') {
            buscarTema();
        }
        else if ($("#busqueda-por-playlist").filter(':checked').val() === 'on') {
            buscarPlaylist();
        }
    }

    function enviarTema(event) {
        event.preventDefault();
        var nombreUsuario = getCookie("rockolito");
        var videoId = this.id;
        var titulo = this.alt;
        var urlThumbnail = this.src;
        console.log(videoId);
        console.log(titulo);
        console.log(urlThumbnail);
        rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail, nombreUsuario)
                .done(obtenerRespuestaDelServidor)
                .fail(mostrarErrorServicioTema);
        obtenerLista();
    }

    function mostrarErrorServicioTema() {
        alert("ERROR con el servicio de Tema");
    }

    function obtenerRespuestaDelServidor(respuesta) {
        if (respuesta.agregado == false) {
            alert("Ingresá la url completa, con youtube!");
        }
    }

    function obtenerLista() {
        rockola.service.tema.obtenerLista()
                .done(actualizarListaTemas)
                .fail(mostrarErrorServicioTema);
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


    function buscarTema() {
        var busqueda = $(".busqueda-tema").val().trim();
        if (busqueda !== "") {
            $("#paginado-playlist").empty();
            $("#grid").html("");
            rockola.service.tema.buscarTemas(busqueda)
                    .done(renderizarTemas)
                    .fail(error);
        }

    }

    function renderizarTemas(data) {
        var items = data.items;
        var videos = [];
        $.each(items, function (index, item) {
            var urlImagen = "";
            if (item.snippet.thumbnails != undefined) {
                urlImagen = item.snippet.thumbnails.default.url;
            }
            if (item.snippet.title != "Deleted video") {
                videos[index] = {
                    "video": {
                        "titulo": item.snippet.title,
                        "urlImagen": urlImagen,
                        "videoId": item.id.videoId
                    }
                };
            }
        }
        );
        $("#grid").empty();
        while (videos.length) {
            var partVideos = videos.splice(0, 12);
            var elementosRenderizados = $("#resultadosTemasTemplate").render(partVideos);
            $("#grid").append(elementosRenderizados);
        }
        $(".grid-tema").on("click", enviarTema);

        $('.grid-tema').on("mouseover", function () {
            $(this).addClass("transition");
        });

        $('.grid-tema').on("mouseout", function () {
            $(this).removeClass("transition");
        });

    }
    function buscarPlaylist() {
        var busqueda = $(".busqueda-tema").val().trim();
        if (busqueda !== "") {
            $("#grid").html("");
            rockola.service.tema.buscarPlayListPorBanda(busqueda)
                    .done(buscarTemasIndividualesDeLaPlaylist)
                    .fail(error);
        }

    }

    function buscarTemasIndividualesDeLaPlaylist(data) {
        renderizarPaginador(data);
    }
    function renderizarPaginador(playlists) {
        $('#paginado-playlist').pagination({
            dataSource: [1, 2, 3, 4, 5, 6, 7],
            pageSize: 1,
            callback: function (data) {
                rockola.service.tema.buscarTemasDePlayList(playlists, data[0])
                        .done(renderizarTemas)
                        .fail(error);
                console.log(data[0]);
            }
        });
    }

    function error() {
        alert("ERROR");
    }


    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});
