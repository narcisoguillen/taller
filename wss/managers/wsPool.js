const socketIo = require('socket.io');
const {http}   = require('../engines/server');
const WSClient = require('../libs/WSClient');

const WSPool = {
  clients : {}
};

WSPool.init = function(){
  WSPool.sio = socketIo(http.cio);

  WSPool.sio.on('connection', WSPool.onConenction);
};

WSPool.onConenction = function(socket){
  WSPool.clients[socket.id] = new WSClient(socket);

  socket.on('disconnect', code =>{
    delete WSPool.clients[socket.id];
  });
};

module.exports = WSPool;
