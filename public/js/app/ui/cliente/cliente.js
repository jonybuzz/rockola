rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        $("#js-boton-enviar").on("click", enviarTema)
    }
    
    function enviarTema(event){
        event.preventDefault();
        var urlTema = $("#link-tema").val();
        rockola.service.tema.enviarTema(urlTema)
                .done(obtenerRespuesta)
                .fail(mostrarErrorServicioTema);
        obtenerLista();
    }
    
    function mostrarErrorServicioTema(){
        alert("ERROR con el servicio de Tema");
    }
    
    function obtenerRespuesta(respuesta){
        if ( respuesta.agregado == false){
            alert("Ingresá la url completa, con youtube!");
        }
    }
    
    function obtenerLista(){
        rockola.service.tema.obtenerLista()
                .done(actualizarListaTemas)
                .fail(mostrarErrorServicioTema)
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