const http = require('http');

module.exports = class Server {
  constructor(settings, app){
    this.settings = settings;
    this.cio      = http.createServer(settings.options, app).listen(settings.port, this.onConnected.bind(this));
  }

  onConnected (){
    console.log({
      message     : 'Server connected',
      description : this.settings
    });
  }
};
