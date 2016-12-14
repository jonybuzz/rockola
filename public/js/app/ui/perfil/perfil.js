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
        var renderRockolas = [];

        $.each(rockolas, function (i, rockola) {
            renderRockolas.push({nombre: rockola.nombre});
        });
        var html = $("#rockolasTemplate").render(renderRockolas);
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

