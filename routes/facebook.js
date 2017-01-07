module.exports = function (app, passport) {

    app.get('/sesion', function (req, res) {
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