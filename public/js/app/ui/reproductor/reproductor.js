/* global YT */

rockola.ui.reproductor = (function () {

    var tag = document.createElement('script');
    var firstScriptTag = $('script')[0];
    var player = $("#player");
    var socket = io();
   

    var done = false;
    function onYouTubeIframeAPIReady(data) {
        if (data !== undefined && data.tema !== undefined) {
            player = new YT.Player('player', {
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
        var nombreRockola = getCookie("rockola");
        rockola.service.tema.obtenerSiguiente()
                .done(function (data) {
                    socket.emit("actualizame", nombreRockola);
                    reproducir(data);
                });
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING && !done) {
            done = true;
        }

        if (event.data === YT.PlayerState.ENDED) {
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
