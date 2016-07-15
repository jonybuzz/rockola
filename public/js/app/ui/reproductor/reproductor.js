rockola.ui.reproductor = (function () {

    var tag = document.createElement('script');
    var firstScriptTag = $('script')[0];
    var player = $("#player");

    var done = false;
    function onYouTubeIframeAPIReady(data) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: data.tema.videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        $('#js-btn-siguiente').on('click', function () {
            pasarAlSiguienteTema();
        });

    }

    function pasarAlSiguienteTema() {
        rockola.service.tema.obtenerSiguiente()
                .done(function (data) {
                    reproducir(data);
                    obtenerListaTemas();
                });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    function resaltarPrimerTema() {
        $(".lista-de-temas .collection-item").first().find("p").css("color", "mediumaquamarine")
        $(".lista-de-temas .collection-item").first().find("p").last().append("Reproduciendo")
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
            console.log('ESTADO: REPRODUCIENDO');
        }

        if (event.data === YT.PlayerState.ENDED) {
            console.log('ESTADO: SIGUIENTE VIDEO');
            pasarAlSiguienteTema();
        }
    }

    function reproducir(data) {
        player.loadVideoById({
            videoId: data.tema.videoId
        });
    }

    function initFrame() {
        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        $.getScript("//www.youtube.com/player_api", function () {
            yt_int = setInterval(function () {
                if (typeof YT === "object") {
                    rockola.service.tema.obtenerPrimerTema()
                            .done(onYouTubeIframeAPIReady);
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
        resaltarPrimerTema();
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
