rockola.ui.profile = (function () {

    function init() {
        $("#btn-unirme-rockola").on("click", function (e) {
            rockola.service.usuario.unirARockola($("#rockola-buscada").val());
        });
        rockola.service.usuario.obtenerRockolas()
                .success(mostrarRockolas)
                .fail(avisarError);
    }

    function mostrarRockolas(rockolas) {
        var html = $("#rockolasTemplate").render(rockolas);
        $("#body-lista-rockolas").html(html);
    }

    function avisarError(e) {
        console.log(e);
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.profile.init();
});

