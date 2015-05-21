var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

var User = require('./../user_session/user.js');


function processUserRequest(req)
{
	//Creating the session :
	var userSession = req.session;

	
	// Checking if an existing user is associated to this session
	if (userSession.User == undefined)
	{
		debug.alertDebug("Got a new request from an unidentified user");
	}

	else
	{
		debug.alertDebug("Got a noew request from : " + userSession.User.firstName + userSession.User.lastName);
	}


}

function processLoginRequest(reqEmail, reqPassword, userSession)
{
	// Checking if the User exists :
	if (!testUserExistence(reqEmail))
	{
		debug.alertDebug("There is no user for email " + reqEmail, 1);
		return false;
	} 
	else
	{
		var currentUser = userPanel[reqEmail];
		if(currentUser.checkPassword(reqPassword))
		{
			debug.alertDebug("User " + currentUser.firstName + currentUser.lastName + "connected sucessfully", 0, 1);
			userSession = currentUser;
			return true;
		}

		else
		{
			debug.alertDebug("User " + currentUser.firstName + currentUser.lastName + "password is not " + reqPassword, 1, 0);
			return false;
		} 
	}

}

function testUserExistence(email)
{
	if (userPanel[email] == undefined) return false;
	else return true;
}


function testSession()
{
	Julien = new User("julimath@gmail.com", "test", "Julien", "Mathiron");
	Nico = new User ("Beaugosse@gmail.com", "test", "Nicolas", "de Maubeuge");

	var userPanel;
	userPanel[Julien.email] = Julien;
	userPanel[Nico.email] = Nico;
}


exports.processUserRequest = processUserRequest;


