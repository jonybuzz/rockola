/* global rockola */

rockola.service.usuario = (function () {

    function obtenerSesion() {
        var sesionUrl = rockola.service.url() + "sesion";
        return rockola.service.get(sesionUrl);
    }

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
        obtenerRockolas: obtenerRockolas,
        obtenerSesion: obtenerSesion
    };

})();
