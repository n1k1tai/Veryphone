var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');


function processUserRequest(req)
{
	//Creating the session :
	var userSession = req.session;

	if (userSession.name == undefined)
	{
		userSession.name = "Julien";
		userSession.views = 0;

		debug.alertDebug("Nouvel utilisateur !");
	}

	userSession.views ++;
	debug.alertDebug("L'utilisateur a" + userSession.views + "vues");
}


exports.processUserRequest = processUserRequest;


