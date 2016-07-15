rockola.service.tema = (function () {

    function enviarTema(videoId, titulo, thumbnail, nombreUsuario) {
        var urlAgregar = rockola.service.url() + "tema/agregar";
        var tema = {
            'videoId': videoId,
            'titulo': titulo,
            'thumbnail': thumbnail,
            'nombreUsuario': nombreUsuario
        };
        return rockola.service.post(urlAgregar, tema);
    }

    function obtenerLista() {
        var urlObtenerLista = rockola.service.url() + "tema/todos";
        return rockola.service.get(urlObtenerLista);
    }

    function obtenerSiguiente() {
        var urlObtenerLista = rockola.service.url() + "tema/siguiente";
        return rockola.service.get(urlObtenerLista);
    }
    
    function obtenerTemaAReproducir() {
        var uri = rockola.service.url() + "tema/temaAReproducir";
        return rockola.service.get(uri);
    }

    function eliminarTemaActual() {
        var uri = rockola.service.url() + "tema/eliminarTemaActual";
        return rockola.service.eliminar(uri);
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
        obtenerTemaAReproducir: obtenerTemaAReproducir,
        eliminarTemaActual: eliminarTemaActual,
        obtenerSiguiente: obtenerSiguiente
    };

})();

