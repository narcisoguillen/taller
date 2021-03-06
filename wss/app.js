try{
  require('./libs/config').init();
  require('./engines/server').init();
  require('./engines/redis').init();
  require('./managers/wsPool').init();

  require('./routes');
}catch(error){
  console.error(error);
  process.exit(1);
}
