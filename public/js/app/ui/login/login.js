/* global rockola */

rockola.ui.login = (function () {
    var nombreUsuario;

    function init() {
        setearCookie();
    }

    function setearCookie() {
        $("#js-boton-logear").on('click',ingresar);
        $('.rockola-input-login').bind("enterKey",function(e){
            ingresar();
        });
        $('.rockola-input-login').keyup(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
            }
        });
    }

    function ingresar(){
        nombreUsuario = $('.rockola-input-login').val().trim();
        if (nombreUsuario !== ""){
            document.cookie = "rockolito=" + nombreUsuario;
            window.location.href = "/cliente";
        }
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

