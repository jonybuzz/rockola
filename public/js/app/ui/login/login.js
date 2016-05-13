rockola.ui.login = (function () {
    var nombreUsuario;

    function init() {
        setearCookie();
    }

    function setearCookie() {
        $("#js-boton-logear").on('click', function () {
            nombreUsuario = $("#js-input-usuario").val().trim();
            if (nombreUsuario !== ""){
                document.cookie = "rockolito=" + nombreUsuario;
                window.location.href = "/cliente";
            }
        });
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

