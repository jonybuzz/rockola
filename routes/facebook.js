module.exports = function (app, passport) {

    app.get('/api/sesion', function (req, res) {
        if (req.user) {
            res.json({anonimo: false, session: req.session, user:req.user});
        } else {
            res.json({anonimo: true, session: req.session});
        }
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/google', passport.authenticate('google', {scope: 'email'}));

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/api/usuario/login-facebook',
                failureRedirect: '/'
            }));
            
    app.get('/auth/google/callback',
            passport.authenticate('facebook', {
                successRedirect: '/api/usuario/login-google',
                failureRedirect: '/'
            }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};