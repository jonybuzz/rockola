var rockola = (function () {
    function url() {
        return location.protocol + '//' + location.host + '/';//document.baseURI;
    }

    return {
        url: url
    };
})();