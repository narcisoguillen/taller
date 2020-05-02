const Redis = require('ioredis');

module.exports.init = function(){
  this.pub = new Redis();
  this.sub = new Redis();

  this.sub.subscribe('actions');
  this.sub.on('message', onMessage);
};

module.exports.send = function(raw){
  this.pub.publish('events', encode(raw));
};

function onMessage(channel, message){
  if(channel !== 'actions'){ return false; }
  try {
    const wsPool = require('../managers/wsPool');

    let data   = decode(message);
    let client = wsPool.clients[data.metadata.socketId];

    client.socket.emit('action', data.payload);
  }catch(error){
    console.error({
      message     : 'Redis onMessage',
      description : error
    });
  }
}

function encode(raw){
  return JSON.stringify(raw);
}

function decode(encoded){
  return JSON.parse(encoded);
}
