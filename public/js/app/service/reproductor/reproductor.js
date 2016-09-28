/* global rockola */

rockola.service.reproductor = (function () {

    function initRockola(nombreRockola) {

        var url = rockola.service.url() + "rockola";
        return rockola.service.put(url, {nombreRockola: nombreRockola})
                .done(function (rocki) {
                    window.location.href = "/reproductor";
                });
    }

    function existe(nombreRockola) {
        var url = rockola.service.url() + "rockola/existe";
        return rockola.service.post(url, {nombreRockola: nombreRockola})
    }
    
    function ingresaCliente(login) {
        var url = rockola.service.url() + "rockola/ingresa";
        return rockola.service.post(url, login);
    }

    return {
        initRockola: initRockola,
        existe: existe,
        ingresaCliente: ingresaCliente
    };

})();
