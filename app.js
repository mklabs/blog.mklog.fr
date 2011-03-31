// Just a basic server setup for this site

require.paths.unshift(__dirname + "/lib");

var Connect = require('connect'),
  wheat = require('wheat');
  
module.exports = Connect.createServer(
  Connect.conditionalGet(),
  Connect.favicon(),
  Connect.cache(),
  wheat(__dirname, {theme: 'wheat-tastytest-theme'})
).listen(3000);
