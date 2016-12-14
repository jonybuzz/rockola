module.exports = function (app, passport) {

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/perfil',
                failureRedirect: '/'
            }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};