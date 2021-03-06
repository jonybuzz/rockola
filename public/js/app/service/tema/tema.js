/* global rockola */

rockola.service.tema = (function () {

    var socket = io();

    function enviarTema(videoId, titulo, thumbnail) {
        var tema = {
            'videoId': videoId,
            'titulo': titulo,
            'thumbnail': thumbnail
        };
        socket.emit('agregarTema', tema);
    }

    function obtenerLista() {
        var urlObtenerLista = rockola.service.url() + "tema/todos";
        return rockola.service.get(urlObtenerLista);
    }

    function obtenerSiguiente() {
        var urlObtenerLista = rockola.service.url() + "tema/siguiente";
        return rockola.service.get(urlObtenerLista);
    }

    function obtenerPrimerTema() {
        var uri = rockola.service.url() + "tema/obtenerPrimerTema";
        return rockola.service.get(uri);
    }


    function buscarTemas(busqueda) {
        var key = "key=AIzaSyD6GvN4zeEbIwp0Jk_46teK15BV1a-h_A0";
        var urlBase = "https://www.googleapis.com/youtube/v3/search";
        var filtros = "part=snippet&maxResults=50&type=video&videoEmbeddable=true&videoSyndicated=true";
        var q = "q=" + busqueda.replace(" ", "+");
        var link = urlBase + "?" + filtros + "&" + q + "&" + key;
        return rockola.service.get(link);
    }

    function buscarPlayListPorBanda(busqueda) {        
        var key = "key=AIzaSyD6GvN4zeEbIwp0Jk_46teK15BV1a-h_A0";
        var urlBase = "https://www.googleapis.com/youtube/v3/search";
        var type = "type=playlist&";
        var filtros = "part=snippet&maxResults=50";
        var q = "q=" + busqueda.replace(" ", "+");
        var link = urlBase + "?" + type + filtros + "&" + q + "&" + key;
        return rockola.service.get(link);
    }

    function buscarTemasDePlayList(playListItems, pagina) {
        var playListId = playListItems.items[pagina].id.playlistId;
        var key = "key=AIzaSyD6GvN4zeEbIwp0Jk_46teK15BV1a-h_A0";
        var urlBase = "https://www.googleapis.com/youtube/v3/playlistItems";
        var filtros = "part=snippet&maxResults=50";
        var q = "playlistId=" + playListId;
        var link = urlBase + "?" + filtros + "&" + q + "&" + key;
        return rockola.service.get(link);
    }  
    return {
        enviarTema: enviarTema,
        obtenerLista: obtenerLista,
        buscarTemas: buscarTemas,
        buscarPlayListPorBanda: buscarPlayListPorBanda,
        buscarTemasDePlayList: buscarTemasDePlayList,
        obtenerPrimerTema: obtenerPrimerTema,
        obtenerSiguiente: obtenerSiguiente
    };

})();
