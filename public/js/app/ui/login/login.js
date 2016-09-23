/* global rockola */

rockola.ui.login = (function () {
    var nombreUsuario;
    var nombreRockola;

    function init() {
        setearCookie();
    }

    function setearCookie() {
        $("#js-boton-logear").on('click',ingresar);
//        $('.rockola-input-nombre.cliente').bind("enterKey",function(e){
//            ingresar();
//        });
//        $('.rockola-input-nombre.cliente').keyup(function(e){
//            if(e.keyCode == 13)
//            {
//                $(this).trigger("enterKey");
//            }
//        });
        
        $("#js-boton-ingresar-rockola").on('click',ingresarRockola);
    }

    function ingresar(){
        nombreUsuario = $('.rockola-input-login.cliente').val().trim();
        if (nombreUsuario !== ""){
            document.cookie = "rockolito=" + nombreUsuario;
            window.location.href = "/cliente";
        }
    }
    
    function ingresarRockola(){
        nombreRockola = $('.js-input-rockola.reproductor').val().trim();
        if (nombreRockola !== ""){
            rockola.service.reproductor.initRockola(nombreRockola);
        }
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

