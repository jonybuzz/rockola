/* global rockola */

rockola.ui.usuario = (function () {
    var nombreRockola;
    var nombreUsuario;

    function setNombreRockola() {
        rockola.service.usuario.obtenerSesion().done(function (sesion) {
            if (sesion.session.passport.rockola) {
                nombreRockola = sesion.session.passport.rockola;
                $('.navbar .nombre-rockola').html(nombreRockola);
            }
        });
    }

    function initMenu() {
        rockola.service.usuario.obtenerSesion().done(function (sesion) {
            if (sesion.session.passport.user) {
                nombreUsuario = sesion.session.passport.nombre;
                $('.navbar .usuario-logueado').html(nombreUsuario);
            }
            alternarLoginLogut(sesion.session.passport);
        });
    }

    function alternarLoginLogut(passport) {
        var login = $('.navbar .login').parent('li');
        var logout = $('.navbar .logout').parent('li');

        if (passport.user) {
            login.addClass('hide');
            logout.removeClass('hide');
        } else {
            login.removeClass('hide');
            logout.addClass('hide');
        }
    }

    return{
        initMenu: initMenu,
        setNombreRockola: setNombreRockola
    };

})();
