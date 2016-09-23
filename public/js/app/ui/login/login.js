/* global rockola */

rockola.ui.login = (function () {
    var nombreUsuario;
    var nombreRockola;

    function init() {
        setearCookie();
        bindearEventos();
    }

    function setearCookie() {
        $("#js-boton-logear").on('click', ingresar);
//        $('.rockola-input-nombre.cliente').bind("enterKey",function(e){
//            ingresar();
//        });
//        $('.rockola-input-nombre.cliente').keyup(function(e){
//            if(e.keyCode == 13)
//            {
//                $(this).trigger("enterKey");
//            }
//        });

        $("#js-boton-ingresar-rockola").on('click', ingresarRockola);
    }

    function ingresar() {
        nombreUsuario = $('.rockola-input-login.cliente').val().trim();
        if (nombreUsuario !== "") {
            document.cookie = "rockolito=" + nombreUsuario;
            window.location.href = "/cliente";
        }
    }

    function ingresarRockola() {
        nombreRockola = $('.js-input-rockola.reproductor').val().trim();
        if (nombreRockola !== "") {
            var put = rockola.service.reproductor.initRockola(nombreRockola);
            document.cookie = "rockola=" + nombreRockola;
            window.location.href = "/reproductor";
        }
    }

    function bindearEventos() {

        $(".rockola-reproductor .activator").on('click', function () {
            $(".rockola-cliente .deactivator").click()
        });
        $(".rockola-cliente .activator").on('click', function () {
            $(".rockola-reproductor .deactivator").click()
        });
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

