module.exports.config = {
    //mongoUrl :"mongodb://rockola:deb0d3f9c3e6e1fc0b8792c1a10f69538256978afd7e9c95b6ca2227a8de781d@localhost:27017/rockola?authSource=admin";
    mongoUrl: "mongodb://localhost:27017/rockola",
    facebook: {
        appId: '169801373463876',
        secret: 'eb6e67552f004fcf25d31a91c03cbe62',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    nombreUsuarioAnonimo: "Anonimo"
};
