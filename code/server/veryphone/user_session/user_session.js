var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

var user= require('./../user_session/user.js');


var Julien = new  user("julimath@gmail.com", "test", "Julien", "Mathiron");
var Nico = new  user ("Beaugosse@gmail.com", "test", "Nicolas", "de Maubeuge");

var userPanel = new Array();
userPanel[Julien.email] = Julien;
userPanel[Nico.email] = Nico;



function processUserRequest(session)
{

	
	// Checking if an existing user is associated to this session
	if (session.user == undefined)
	{
		
	}

	else
	{
		
	}


}

function processSignUpRequest(reqEmail, reqPassword, reqFirstName, reqLastName)
{
	if (testUserExistence(email))
	{
		debug.alertDebug("Requested SignIN for user " + reqEmail + " but user already exists",1);
		return false;
	} 
	else 
	{
		var currentUser = new user(reqEmail, reqPassword, reqFirstName, reqLastName);
		userPanel[currentUser.email] = currentUser;

		debug.alertDebug("User " + reqFirstName + " " + reqLastName + " on " + reqEmail + " sucessfully signed up",0,1);
		return true;
	}
}

function processSignInRequest(reqEmail, reqPassword, userSession)
{
	// Checking if the User exists :
	if (!testUserExistence(reqEmail))
	{
		debug.alertDebug("There is no user for email " + reqEmail, 1);
		return false;
	} 
	else
	{
		var currentUser = userPanel[reqEmail]; // TODO : store in database 
		if(currentUser.checkPassword(reqPassword))
		{
			debug.alertDebug("User " + currentUser.firstName + " " + currentUser.lastName + " connected sucessfully", 0, 1);
			userSession.user = currentUser;
			return true;
		}

		else
		{
			debug.alertDebug("User " + currentUser.firstName+ " " + currentUser.lastName + " password is not " + reqPassword, 1, 0);
			return false;
		} 
	}

}

function processSignOutRequest(session)
{
	debug.alertDebug("User " + session.user.firstName + " " + session.user.lastName + "Signed out", 0, 1);
	session.user = undefined;
}

function testUserExistence(email)
{
	if (userPanel[email] == undefined) return false;
	else return true;
}



exports.processUserRequest = processUserRequest;
exports.processSignInRequest = processSignInRequest;
exports.processSignUpRequest = processSignUpRequest;
exports.processSignOutRequest = processSignOutRequest;

