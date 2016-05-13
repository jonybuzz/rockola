rockola.ui.cliente = (function () {

    function init() {
        
        $("#js-boton-enviar").on("click", enviarTema)
    }
    
    function enviarTema(){
        var urlTema = $("#link-tema").val();
        rockola.service.cliente.enviarTema(urlTema);
    }

    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});