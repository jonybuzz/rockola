rockola.service = (function () {
    function uriService() {
        url = "http://localhost:3000/";
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

    function put(uri, data) {
        return $.ajax({
            contentType: 'application/json; charset=UTF-8',
            url: uri,
            type: 'PUT',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    function eliminar(uri, data) {
        return $.ajax({
            contentType: 'application/json; charset=UTF-8',
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

