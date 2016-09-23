/* global rockola */

rockola.ui.login = (function () {
    var nombreUsuario;
    var nombreRockola;

    function init() {
        setearCookie();
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

