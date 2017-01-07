/* global rockola */

rockola.ui.login = (function () {
    var nombreRockola;

    function init() {
        initListaDeRockolas();
        bindearEventos();
    }

    function bindearEventos() {
        $("#js-boton-logear-cliente").on('click', unirseARockolaAnonimo);

        $("#js-boton-ingresar-rockola").on('click', ingresarAReproductor);
        
        $(".rockola-reproductor .activator").on('click', function () {
            $(".rockola-cliente .deactivator").click();
        });
        $(".rockola-cliente .activator").on('click', function () {
            $(".rockola-reproductor .deactivator").click();
        });
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
                        alert('No existe la rockola ' + nombreRockola + 
                                '. Podés crearla y reproducir música escribiendo un nuevo nombre en "Reproducir"');
                    }

                });
    }

    function ingresarAReproductor() {
        nombreRockola = $('.input-rockola .autocomplete-rockolas').val().trim();
        if (nombreRockola !== "") {
            rockola.service.reproductor.ingresaClienteAnonimo(nombreRockola)
                    .done(function () {
                        rockola.service.reproductor.initRockola(nombreRockola);
                    });
        }
    }

    return{
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.login.init();
});

