var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

User.numberOfUsers=0;
User.lastUserId=0;

function User(cookieId)
{
	var userId;
	var userType;

	debug.alertDebug("Creating a new user");
	
	User.numberOfUsers++;


	if (typeof(cookieId != 'undefined'))
	{
		// Look for the cookie id in the database...

	}

	this.getNumberOfUsers = function()
	{
		debug.alertDebug("We know have " + this.constructor.numberOfUsers + " users");	
	}

	debug.alertDebug("User id : created" )

}


exports.User = User;
