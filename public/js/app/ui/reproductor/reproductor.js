rockola.ui.reproductor = (function () {

    var tag = document.createElement('script');
    var firstScriptTag = $('script')[0];
    var player = $("#player");
    var listaReproduccion;

    var done = false;
    function onYouTubeIframeAPIReady(data) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: data.temas.videoId
//            ,
//            playerVars: {
//                controls: 0,
//                disablekb: 1
//            }
            ,
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
            console.log('ESTADO: SIGUIENTE VIDEO');
            rockola.service.tema.obtenerSiguiente().done(reproducir);
            obtenerListaTemas();
        }
    }

    function reproducir(data) {
        player.loadVideoById({
            videoId: data.temas.videoId
        });
    }

    function initFrame() {
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        $.getScript("//www.youtube.com/player_api", function () {
            yt_int = setInterval(function () {
                if (typeof YT === "object") {
                    rockola.service.tema.obtenerSiguiente().done(onYouTubeIframeAPIReady);
                    clearInterval(yt_int);
                }
            }, 500);
        });
    }

    function obtenerListaTemas() {
        rockola.service.tema.obtenerLista().done(renderizarListaTemas);
    }

    function renderizarListaTemas(lista) {
        listaReproduccion = lista.temas;
        var html = $("#bodyListaTemplate").render(listaReproduccion);
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

