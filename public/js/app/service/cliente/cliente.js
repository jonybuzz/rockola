rockola.service.cliente = (function () {

    function enviarTema(urlTema){
        var urlAgregar = "/tema/agergar";
        rockola.service.post(rockola.url() + urlAgregar , urlTema);        
    }
    
    function obtenerLista(){
        
//        rockola.service.get(rockola.url() + )
    }

    return {
        enviarTema: enviarTema
    };
})();

