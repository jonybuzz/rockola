/* global rockola */

rockola.ui.reproductorVista = (function () {

    function init() {
        $(".button-collapse").sideNav({
            menuWidth: 320,
            edge: 'right'
        });
        rockola.ui.usuario.initMenu();
        rockola.ui.usuario.setNombreRockola();
    }

    return {
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.reproductorVista.init();
});
