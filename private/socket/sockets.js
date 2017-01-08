var sharedsession = require("express-socket.io-session");

module.exports.createSocket = function (server, session) {

    var io = require('socket.io')(server);

    io.use(sharedsession(session, {
        autoSave: true
    }));

    require('../socket/temaSocket')(io);
};
