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
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        $(".lista-reproduccion tbody tr").first().css("color", "mediumaquamarine")
        $(".lista-reproduccion tbody tr").first().find("td").last().append("<h6>Reproduciendo</h6>")
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
            console.log('ESTADO: REPRODUCIENDO');
        }

        if (event.data === YT.PlayerState.ENDED) {
            console.log('ESTADO: SIGUIENTE VIDEO');
            rockola.service.tema.obtenerSiguiente()
                    .done(function (data) {
                        reproducir(data);
                        obtenerListaTemas();
                    });

        }
    }

    function reproducir(data) {
        console.log('REPRODUCIENDO: ' + data.tema.titulo);

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
                    rockola.service.tema.obtenerTemaAReproducir()
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

