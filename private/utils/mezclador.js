function agrupar(array) {
    var acumulador = {};
    if (array.length > 0) {
        array.forEach(function (item) {
            if (acumulador.hasOwnProperty(item.nombreUsuario)) {
                acumulador[item.nombreUsuario].push(item);
            } else {
                acumulador[item.nombreUsuario] = [];
                acumulador[item.nombreUsuario].push(item);
            }
        });
    }
    return merge(acumulador, array.length);
}

function merge(acumulador, tamanio) {
    var arrayMezclado = [];
    var keys = Object.keys(acumulador);
    for (var i = 0; i < tamanio; i++) {
        keys.forEach(function (key) {
            var item = acumulador[key].splice(0, 1)[0];
            if (item !== undefined) {
                arrayMezclado.push(item);
            }
        });
    }
    return arrayMezclado;
}

function mezclador(array) {
    return agrupar(array);
}

module.exports = mezclador;