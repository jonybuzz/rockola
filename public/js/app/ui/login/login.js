rockola.ui.login = (function () {
    var nombreUsuario;

    function init() {
        setearCookie();
    }

    function setearCookie() {
        $("#js-boton-logear").on('click',ingresar);
        $('#js-input-usuario').bind("enterKey",function(e){
            ingresar();
        });
        $('#js-input-usuario').keyup(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterKey");
            }
        });
    }

    function ingresar(){
        nombreUsuario = $("#js-input-usuario").val().trim();
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

