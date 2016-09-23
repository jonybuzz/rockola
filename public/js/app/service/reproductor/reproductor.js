/* global rockola */

rockola.service.reproductor = (function () {

    function initRockola(nombreRockola) {

        var url = rockola.service.url() + "rockola";
        return rockola.service.put(url, {nombreRockola: nombreRockola})
                .done(function (rocki) {
                    document.cookie = "rockola=" + rocki.nombre;
                    window.location.href = "/reproductor";
                });
    }

    function existe(nombreRockola) {
        var url = rockola.service.url() + "rockola/existe";
        return rockola.service.post(url, {nombreRockola: nombreRockola})
    }

    return {
        initRockola: initRockola,
        existe: existe
    };

})();
