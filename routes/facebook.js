module.exports = function (app, passport) {

    app.get('/auth/anonymous',
            // Authenticate using HTTP Basic credentials, with session support disabled, and allow anonymous requests.
            passport.authenticate('anonymous', {
                session: false
            }),
            function (req, res) {
                if (req.user) {
                    res.json({username: req.session, email: req.user.email});
                } else {
                    res.json({anonymous: true, session: req.session});
                }
            });

    app.get('/lalo', function (req, res) {
        if (req.user) {
            res.json({username: req.session, email: req.user.email});
        } else {
            res.json({anonymous: true, session: req.session});
        }
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/api/usuario/ingresaPerfil',
                failureRedirect: '/'
            }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};