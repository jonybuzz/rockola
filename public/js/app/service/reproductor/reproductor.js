/* global rockola */

rockola.service.reproductor = (function () {
    
    function initRockola(nombreRockola){
        
        var url = rockola.service.url() + "rockola";
        return rockola.service.put(url, nombreRockola);
    }
    
    return {
        initRockola: initRockola
    };
    
})();
