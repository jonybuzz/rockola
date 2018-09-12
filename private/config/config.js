module.exports = {
    dbUrl: (process.env.MONGOURL || 'mongodb://localhost:27017') + '/rockola',
    facebook: {
        clientID: (process.env.FBAPPID || '1774831262842815'),
        clientSecret: (process.env.FBSECRET || 'feaa44c8995b61e48b55ce66bd1a5074'),
        callbackURL: (process.env.SERVERURL || 'http://localhost:3000') + '/auth/facebook/callback'
    },
    nombreUsuarioAnonimo: "Anonimo"
};
