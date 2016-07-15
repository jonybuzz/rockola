module.exports.createSocket = function(server) {

  var io = require('socket.io')(server);

  require('../socket/temaSocket')(io);
  require('../socket/loginSocket')(io);

}
