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
    
    function ingresaClienteConFacebook(nombreRockola) {
        var url = rockola.service.url() + "rockola/ingresa/facebook";
        return rockola.service.post(url, {nombreRockola: nombreRockola});
    }
    
    function obtenerRockolas(){
        var url = rockola.service.url() + "rockola";
        return rockola.service.get(url);
    }

    return {
        initRockola: initRockola,
        existe: existe,
        ingresaCliente: ingresaCliente,
        ingresaClienteConFacebook: ingresaClienteConFacebook,
        obtenerRockolas: obtenerRockolas
    };

})();
