rockola.ui.reproductor = (function () {

    var listaDeReproduccion;
    var tag = document.createElement('script');
    var firstScriptTag = $('script')[0];
    var player = $("#player");
    var done = false;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'koAnIdfXtp8',
            playerVars: {
                controls: 0,
                disablekb: 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
            console.log('ESTADO: REPRODUCIENDO');
        }

        if (event.data === YT.PlayerState.ENDED) {
            console.log('ESTADO: FINALIZADO');
        }
    }

    function initFrame() {
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        $.getScript("//www.youtube.com/player_api", function () {
            yt_int = setInterval(function () {
                if (typeof YT === "object") {
                    onYouTubeIframeAPIReady();
                    clearInterval(yt_int);
                }
            }, 500);
        });
    }

    function obtenerListaTemas() {
        rockola.service.tema.obtenerLista().done(renderizarListaTemas);
    }

    function renderizarListaTemas(lista) {
        var html = $("#bodyListaTemplate").render(lista.temas);
        $("#body-lista-reproductor").html(html);
    }

    function init() {
        obtenerListaTemas();
        initFrame();
    }

    return {
        init: init
    };

})();

$(document).ready(function () {
    rockola.ui.reproductor.init();
});

