rockola.service.cliente = (function () {

    function enviarTema(urlTema){
        var urlAgregar = rockola.url() + "/tema/agregar";
        rockola.service.post(urlAgregar , urlTema);        
    }
    
    function obtenerLista(){
        var urlObtenerLista = rockola.url() + "/tema/todos";
        return rockola.service.get( urlObtenerLista);
    }

    return {
        enviarTema: enviarTema,
        obtenerLista: obtenerLista
    };
})();

