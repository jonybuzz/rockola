rockola.service = (function () {
    function uriService() {
        url =  rockola.url();
        return url + "api/";
    }

    function get(uri, data, successCallback, errorCallback) {
        return $.get(uri, data, successCallback, errorCallback);
    }


    function post(uri, data) {
        return $.ajax({
            url: uri,
            type: 'POST',
            data: data
        });
    }
    
    //revisar put
    function put(uri, data) {
        return $.ajax({
            url: uri,
            type: 'PUT',
            data: data
        });
    }

    function eliminar(uri, data) {
        return $.ajax({
            url: uri,
            type: 'DELETE',
            data: JSON.stringify(data)
        });
    }


    return {
        url: uriService,
        get: get,
        post: post,
        put: put,
        eliminar: eliminar
    };
})();

