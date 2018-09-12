var FacebookStrategy = require('passport-facebook').Strategy;
var AnonymousStrategy = require('passport-anonymous').Strategy;
var UsuarioModel = require("../model/Usuario.model");
var configFacebook = require('../config/config').config.facebook;

var crearUsuarioFacebook = function (token, refreshToken, profile, done) {

    process.nextTick(function () {
        UsuarioModel.findOne({'facebook.id': profile.id}, function (err, usuario) {
            if (err) {
                return done(err);
            }

            if (usuario) {
                return done(null, usuario);
            } else {
                var nuevoUsuario = new UsuarioModel();
                nuevoUsuario.facebook.id = profile.id;
                nuevoUsuario.nombre = profile.displayName;

                nuevoUsuario.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    return done(null, nuevoUsuario);
                });
            }

        });
    });
};

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        UsuarioModel.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy(configFacebook, crearUsuarioFacebook));
    
    passport.use(new AnonymousStrategy());
};

