rockola.service.usuario = (function () {

    function unirARockola(nombreRockola) {
        var unirARockolaUrl = rockola.service.url() + "usuario/rockola";
        rockola.service.post(unirARockolaUrl, {nombreRockola: nombreRockola});
    }

    function obtenerRockolas() {
        var usuarioLogueadoUri = rockola.service.url() + "usuario/obtenerRockolas";
        return rockola.service.get(usuarioLogueadoUri);
    }

    return {
        unirARockola: unirARockola,
        obtenerRockolas: obtenerRockolas
    };

})();
