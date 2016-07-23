/* global rockola */

rockola.service.tema = (function () {

    var socket = io();

    function enviarTema(videoId, titulo, thumbnail, nombreUsuario) {
        var tema = {
            'videoId': videoId,
            'titulo': titulo,
            'thumbnail': thumbnail,
            'nombreUsuario': nombreUsuario
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
        var key = "key=AIzaSyBeKd3kWCtAnj07nF2_Gf1IGRcm_GKMZwo";
        var urlBase = "https://www.googleapis.com/youtube/v3/search";
        var filtros = "part=snippet&maxResults=50&type=video&videoEmbeddable=true&videoSyndicated=true";
        var q = "q=" + busqueda.replace(" ", "+");
        var link = urlBase + "?" + filtros + "&" + q + "&" + key;
        console.log(link);
        return rockola.service.get(link);
    }

    return {
        enviarTema: enviarTema,
        obtenerLista: obtenerLista,
        buscarTemas: buscarTemas,
        obtenerPrimerTema: obtenerPrimerTema,
        obtenerSiguiente: obtenerSiguiente
    };

})();
