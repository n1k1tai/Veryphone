var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

function init()
{
	// Notifying server init :
	debug.alertDebug("User session init", false, false);

	var session = require('express-session');

}


exports.init = init;


