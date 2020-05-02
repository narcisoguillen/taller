const Redis = require('ioredis');

module.exports.init = function(){
  this.pub = new Redis();
  this.sub = new Redis();

  this.sub.subscribe('events');
  this.sub.on('message', onMessage.bind(this));
};

module.exports.send = function(raw){
  this.pub.publish('events', encode(raw));
};

function onMessage(channel, message){
  if(channel !== 'events'){ return false; }
  try {
    let data = decode(message);

    if(data.payload.current == '@'){
      this.pub.publish('actions', encode({
        metadata : data.metadata,
        payload  : {
          0 : 'foo@my.company',
          1 : 'bar@my.company'
        }
      }));
    }

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
