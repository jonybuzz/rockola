rockola.service.cliente = (function () {

    function enviarTema(urlTema){
        rockola.service.post(rockola.url()+"" , urlTema);
    }

    return {
        enviarTema: enviarTema
    };
})();

