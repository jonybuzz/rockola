rockola.ui.reproductorVista = (function () {

    function init() {
        $(".button-collapse").sideNav({
            menuWidth: 320,
            edge: 'right'
        });
    }

    return {
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.reproductorVista.init();
});
