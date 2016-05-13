rockola.service.tema = (function () {

    function enviarTema(urlTema){
        var urlAgregar = rockola.service.url() + "tema/agregar";
        var tema = { 'temaUrl' : urlTema};
        return rockola.service.post(urlAgregar , tema);        
    }
    
    function obtenerLista(){
        var urlObtenerLista = rockola.service.url() + "tema/todos";
        return rockola.service.get( urlObtenerLista);
    }

    return {
        enviarTema: enviarTema,
        obtenerLista: obtenerLista
    };
})();

