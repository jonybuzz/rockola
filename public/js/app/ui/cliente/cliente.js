rockola.ui.cliente = (function () {

    function init() {
        obtenerLista();
        $("#js-boton-enviar").on("click", buscarPlayList);
        $('#busqueda').bind("enterKey",function(e){
            buscarPlayList();
        });
        $('#busqueda').keyup(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
            }
        });

    }

    function enviarTema(event) {
        event.preventDefault();                
        var nombreUsuario = getCookie("rockolito");

        var videoId = this.id;
        var titulo = this.alt;
        var urlThumbnail = this.src;

        console.log(videoId);
        console.log(titulo);
        console.log(urlThumbnail);

        rockola.service.tema.enviarTema(videoId, titulo, urlThumbnail, nombreUsuario)
                .done(obtenerRespuestaDelServidor)
                .fail(mostrarErrorServicioTema);
        obtenerLista();
    }

    function mostrarErrorServicioTema() {
        alert("ERROR con el servicio de Tema");
    }

    function obtenerRespuestaDelServidor(respuesta) {
        if (respuesta.agregado == false) {
            alert("Ingresá la url completa, con youtube!");
        }
    }

    function obtenerLista() {
        rockola.service.tema.obtenerLista()
                .done(actualizarListaTemas)
                .fail(mostrarErrorServicioTema)
    }

    function actualizarListaTemas(lista) {
        var html = $("#bodyListaTemplate").render(lista.temas);
        $("#body-lista-reproduccion").html(html);
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function buscarPlayList(){
        var busqueda = $("#busqueda").val().trim();
        if(busqueda !== ""){
            rockola.service.tema.buscarTemas(busqueda)
                .done(renderizarVideos)
                .fail(error)
        }
        
    }

    function renderizarVideos(data){
        $("#grid").html("");
        var items = data.items;
        var videos = [];
        $.each(items , function(index, item){
            var urlImagen = "";
            if(item.snippet.thumbnails != undefined){
                urlImagen = item.snippet.thumbnails.default.url;
            }
            if(item.snippet.title!="Deleted video"){
                videos[index] = {
                    "video" : {
                        "titulo" : item.snippet.title,
                        "urlImagen" : urlImagen,
                        "videoId" :item.id.videoId
                    }
                }
            }
        }
        )        
        while(videos.length) {
            var partVideos = videos.splice(0,4);
            var html = $("#bodyGridTemplate").render(partVideos);
            $("#grid").append("<div class='row'>"+html+"</div> ");
        }
        $(".grid-tema").on("click", enviarTema)

        $('.grid-tema').on("mouseover",function(){
            $(this).addClass("transition");
        })
        
        $('.grid-tema').on("mouseout",function(){
            $(this).removeClass("transition");
        })
       
    }

    function error(){
        alert("ERROR");
    }


    return {
        init: init
    };
})();

$(document).ready(function () {
    rockola.ui.cliente.init();
});
