/* global rockola */

rockola.ui.login = (function () {
    var nombreRockola;

    function init() {
        initListaDeRockolas();
        setearCookie();
        bindearEventos();
    }

    function setearCookie() {
        $("#js-boton-logear-cliente").on('click', unirseARockolaAnonimo);

        $("#js-boton-ingresar-rockola").on('click', ingresarRockola);
    }

    function initListaDeRockolas() {
        rockola.service.reproductor.obtenerRockolas().done(function (data) {

            var nombresDeRockolas = {};

            $.each(data.rockolas, function (i, el) {
                nombresDeRockolas[el.nombre] = null;
            });

            $('input.autocomplete-rockolas').autocomplete({
                data: nombresDeRockolas
            });
        });
    }

    function unirseARockolaAnonimo() {
        nombreRockola = $('.input-cliente .autocomplete-rockolas').val().trim();
        rockola.service.reproductor.existe(nombreRockola)
                .done(function (res) {
                    if (res.existe !== null) {
                        rockola.service.reproductor.ingresaClienteAnonimo(nombreRockola)
                                .done(function () {
                                    window.location.href = "/cliente";
                                });
                    } else {
                        alert("No existe una rockola con ese nombre");
                    }

                });
    }

    function ingresarRockola() {
        nombreRockola = $('.input-rockola .autocomplete-rockolas').val().trim();
        if (nombreRockola !== "") {
            rockola.service.reproductor.initRockola(nombreRockola);
        }
    }

    function bindearEventos() {

        $(".rockola-reproductor .activator").on('click', function () {
            $(".rockola-cliente .deactivator").click();
        });
        $(".rockola-cliente .activator").on('click', function () {
            $(".rockola-reproductor .deactivator").click();
        });
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

