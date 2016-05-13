rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        $("#js-boton-enviar").on("click", enviarTema)
    }
    
    function enviarTema(){
        var urlTema = $("#link-tema").val();
        rockola.service.cliente.enviarTema(urlTema);
        obtenerLista();
    }
    
    function obtenerLista(){
        rockola.service.cliente.obtenerLista()
                .done(actualizarListaTemas)
                .fail(alert("ERROR al obtener la lista de temas"))
    }
    
    function actualizarListaTemas(temas){
        $("#body-lista-reproduccion").html("<tr>");
        $.each(temas , function(tema){
            $("#body-lista-reproduccion").append("<td>" + tema + "</td>");
        })
        $("#body-lista-reproduccion").append("</tr>");
    }

    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});