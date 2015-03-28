//Initializing the debug function :
var debugModule = require("./veryphone/interface/debug.js");
debug = new debugModule.debug(true, true, 'log.txt');
debug.alertDebug("Veryphone server started", true, false, false);

// Initializing the web server function :
var webServerModule = require("./veryphone/webserver/webserver.js");
webServerModule.init();