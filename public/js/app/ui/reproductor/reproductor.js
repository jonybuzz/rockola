rockola.ui.reproductor = (function () {

    var tag = document.createElement('script');
    var firstScriptTag = $('script')[0];
    var player = $("#player");
    var socket = io();
   

    var done = false;
    function onYouTubeIframeAPIReady(data) {
        if (data !== undefined && data.tema !== undefined) {
            player = new YT.Player('player', {
                height: '390',
                width: '640',
                events: {
                    'onReady': function (){
                        reproducir(data);
                    },
                    'onStateChange': onPlayerStateChange
                }
            });

            $('#js-btn-siguiente').on('click', function () {
                pasarAlSiguienteTema();
            });
        }
    }

    function pasarAlSiguienteTema() {
        rockola.service.tema.obtenerSiguiente()
                .done(function (data) {
                    socket.emit("actualizame");
                    reproducir(data);
                });
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
        if (data !== undefined && data.tema !== undefined) {
            player.loadVideoById({
                videoId: data.tema.videoId,
                endSeconds:$("#tiempo-de-reproduccion").val()
            });
        }
    }

    function initFrame() {
        $('select').material_select();
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

    return {
        init: initFrame
    };

})();

$(document).ready(function () {
    rockola.ui.reproductor.init();
});
