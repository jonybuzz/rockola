/* global rockola */

rockola.ui.login = (function () {
    var nombreUsuario;
    var nombreRockola;

    function init() {
        setearCookie();
        bindearEventos();
    }

    function setearCookie() {
        $("#js-boton-logear-cliente").on('click',unirseARockola);
        
        $("#js-boton-ingresar-rockola").on('click',ingresarRockola);
    }

    function unirseARockola(){
        nombreUsuario = $('.rockola-input-nombre.cliente').val().trim();
        nombreRockola = $('.rockola-input-rockola.cliente').val().trim();
        if (nombreUsuario !== ""){
            document.cookie = "rockolito=" + nombreUsuario;
            document.cookie = "rockola=" + nombreRockola;
            window.location.href = "/cliente";
        }
    }

    function ingresarRockola() {
        nombreRockola = $('.js-input-rockola.reproductor').val().trim();
        if (nombreRockola !== ""){
            rockola.service.reproductor.initRockola(nombreRockola);
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

