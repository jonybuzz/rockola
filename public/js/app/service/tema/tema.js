rockola.service.tema = (function () {

    function enviarTema(videoId, titulo, thumbnail) {
        var urlAgregar = rockola.service.url() + "tema/agregar";
        var tema = {
            'videoId': videoId,
            'titulo' : titulo,
            'thumbnail' : thumbnail
        };
        return rockola.service.post(urlAgregar, tema);
    }

    function obtenerLista() {
        var urlObtenerLista = rockola.service.url() + "tema/todos";
        return rockola.service.get(urlObtenerLista);
    }

    function obtenerDatos(videoId) {
        var urlObtenerNombreApiYoutube =
                "https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBeKd3kWCtAnj07nF2_Gf1IGRcm_GKMZwo&id="
                + videoId;
        return rockola.service.get(urlObtenerNombreApiYoutube);
    }

    function obtenerSiguiente() {
        var urlObtenerLista = rockola.service.url() + "tema/siguiente";
        return rockola.service.get(urlObtenerLista);
    }

    return {
        enviarTema: enviarTema,
        obtenerLista: obtenerLista,
        obtenerDatos: obtenerDatos,
        obtenerSiguiente: obtenerSiguiente
    };

})();

