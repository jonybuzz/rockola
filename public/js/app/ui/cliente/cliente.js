/* global rockola */

rockola.ui.cliente = (function () {

    var nombreUsuario;
    var nombreRockola;

    function init() {
        nombreUsuario = getCookie("rockolito");
        nombreRockola = getCookie("rockola");
        obtenerLista();
        bindearTeclaEnter();
        $("#js-buscar-tema").on("click", buscarContenido);
        $(".boton-agregar-todos").on("click", agregarTodos);
    }

    function agregarTodos() {
        $(".grid-tema").each(function (index, data) {
            var videoId = data.id;
            var titulo = data.alt;
            var urlThumbnail = data.src;
            rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail, nombreUsuario, nombreRockola);
        });
    }

    function bindearTeclaEnter() {
        $('.rockola-busqueda').bind("enterKey", function (e) {
            buscarContenido();
        });
        $('.rockola-busqueda').keyup(function (e) {
            if (e.keyCode === 13)
            {
                $(this).trigger("enterKey");
            }
        });
    }


    function buscarContenido() {
        if ($("#busqueda-por-tema").filter(':checked').val() === 'on') {
            buscarTema();
        } else if ($("#busqueda-por-playlist").filter(':checked').val() === 'on') {
            buscarPlaylist();
        }
    }

    function enviarTema(event) {
        event.preventDefault();
        var videoId = this.id;
        var titulo = this.alt;
        var urlThumbnail = this.src;

        rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail, nombreUsuario, nombreRockola);
        obtenerLista();
    }

    function mostrarErrorServicioTema() {
        alert("ERROR con el servicio de Tema");
    }

    function obtenerLista() {
        rockola.service.tema.obtenerLista()
                .done(actualizarListaTemas)
                .fail(mostrarErrorServicioTema);
    }

    function actualizarListaTemas(lista) {
        console.log(lista);
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
                    .done(renderizarTemasBusquedaComun)
                    .fail(error);
        }

    }

    function armarListaDeVideos(data) {
        var items = data.items;
        var videos = [];
        $.each(items, function (index, item) {
            var urlImagen = "";
            if (item.snippet.thumbnails !== undefined) {
                urlImagen = item.snippet.thumbnails.default.url;
            }
            if (item.snippet.title !== "Deleted video") {
                videos[index] = {
                    "video": {
                        "titulo": item.snippet.title,
                        "urlImagen": urlImagen,
                        "videoId": item.id.videoId ? item.id.videoId : item.snippet.resourceId.videoId
                    }
                };
            }
        });
        return videos;
    }

    function renderizarTemasBusquedaComun(data) {
        $(".boton-agregar-todos").addClass("hide");
        renderizarTemas(data);
    }

    function renderizarTemas(data) {
        var videos = armarListaDeVideos(data);
        appenderElementosRenderizado(videos);
        bindearEventosGrillaTema();
    }

    function renderizarTemasDeLaPlaylist(data) {
        $(".boton-agregar-todos").removeClass("hide");
        renderizarTemas(data);
    }

    function bindearEventosGrillaTema() {
        $('.grid-tema').on("mouseover", function () {
            $(this).addClass("transition");
        });

        $('.grid-tema').on("mouseout", function () {
            $(this).removeClass("transition");
        });
    }

    function appenderElementosRenderizado(videos) {
        $("#grid").empty();
        while (videos.length) {
            var partVideos = videos.splice(0, 12);
            var elementosRenderizados = $("#resultadosTemasTemplate").render(partVideos);
            $("#grid").append(elementosRenderizados);
        }
        $(".grid-tema").on("click", enviarTema);

    }
    function buscarPlaylist() {
        var busqueda = $(".busqueda-tema").val().trim();
        if (busqueda !== "") {
            $("#grid").html("");
            rockola.service.tema.buscarPlayListPorBanda(busqueda)
                    .done(inicializarPaginadoPlaylist)
                    .fail(error);
        }
    }

    function inicializarPaginadoPlaylist(playlists) {
        $(".boton-agregar-todos").removeClass("hidden");
        $('#paginado-playlist').pagination({
            dataSource: Array.from(Array(playlists.items.length).keys()),
            pageSize: 1,
            callback: function (data) {
                rockola.service.tema.buscarTemasDePlayList(playlists, data[0])
                        .done(renderizarTemasDeLaPlaylist)
                        .fail(error);
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
