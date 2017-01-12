/* global rockola */

rockola.ui.login = (function () {
    var nombreRockola;

    function init() {
        initListaDeRockolas();
        bindearEventos();
        rockola.ui.usuario.initMenu();
    }

    function bindearEventos() {
        $("#js-boton-logear-cliente").on('click', unirseARockola);

        $("#js-boton-ingresar-rockola").on('click', ingresarAReproductor);
        
        $(".rockola-reproductor .activator").on('click', function () {
            $(".rockola-cliente .deactivator").click();
        });
        $(".rockola-cliente .activator").on('click', function () {
            $(".rockola-reproductor .deactivator").click();
        });
    }

    function initListaDeRockolas() {
        rockola.service.usuario.obtenerRockolas().done(function (data) {

            var nombresDeRockolas = {};

            $.each(data, function (i, rockola) {
                nombresDeRockolas[rockola.nombre] = null;
            });

            $('input.autocomplete-rockolas').autocomplete({
                data: nombresDeRockolas
            });
        });
    }

    function unirseARockola() {
        nombreRockola = $('.input-cliente .autocomplete-rockolas').val().trim();
        rockola.service.reproductor.existe(nombreRockola)
                .done(function (res) {
                    if (res.existe !== null) {
                        rockola.service.reproductor.ingresaCliente(nombreRockola)
                                .done(function () {
                                    window.location.href = "/cliente";
                                });
                    } else {
                        alert('No existe la rockola "' + nombreRockola + 
                                '". Podés crearla y reproducir música escribiendo un nuevo nombre abajo');
                    }

                });
    }

    function ingresarAReproductor() {
        nombreRockola = $('.input-rockola .autocomplete-rockolas').val().trim();
        if (nombreRockola !== "") {
            rockola.service.reproductor.ingresaCliente(nombreRockola)
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

