const nconf = require('nconf');

module.exports.alive = function(req, res){
  return res.send('Ok');
};

module.exports.home = function(req, res){
  return res.render('index.html', {
    wss : nconf.get('services:wss')
  });
};
