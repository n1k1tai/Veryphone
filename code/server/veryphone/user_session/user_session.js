var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

// Uiid module for user identifying :
var uuidModule = require('node-uuid');

User.numberOfUsers=0;
User.lastUserId=0;

function User(cookie)
{
	var uuid;
	var lastActivity = new Date();

	debug.alertDebug("Creating a new user");
	
	User.numberOfUsers++;
	uuid = uuidModule.v4();


	// if (typeof(cookieId != 'undefined'))
	// {
	// 	// Look for the cookie id in the database...

	// }

	this.getNumberOfUsers = function()
	{
		debug.alertDebug("We know have " + this.constructor.numberOfUsers + " users");	
	}

	this.getInactivityTimeS = function()
	{
		return Math.abs(new Date() - lastActivity);
	}

	this.setActiveNow = function()
	{
		lastActivity = new Date();
	}

	this.delete = function()
	{
		this.constructor.numberOfUsers--;
		delete this;
	}

	debug.alertDebug("User id : created" )

}

function UserRamDatabase(maxNumberOfUsers)
{
	var userRamArray[];
	var numberOfUsersInRam = 0;
	var maxNumberOfUsers = maxNumberOfUsers;

	this.storeUser = function(user)
	{
		this.userRamArray[user.uuid] = user;
		if (numberOfUsersInRam + 1 > maxNumberOfUsers) return false;

		this.numberOfUsersInRam++;
		debug.alertDebug("User uuid " + user.uuid + " sucessfully added to user session");
		return true
	}

	this.getUser = function(uuid)
	{
		return this.userRamArray[uuid];
	}

	this.deleteInactiveUsers = function(inactivityTimeS)
	{
		for (var i=0, var length = this.userRamArray.length; i < length; i++ )
		{
			if (this.userRamArray[i].getInactivityTimeS > inactivityTimeS)
			{
				debug.alertDebug("Deleting user id " + this.userRamArray[i].uuid + " because it was inactive", false, true);
				this.userRamArray[i].delete();
				this.userRamArray.splice(i,1);
			}


		}
	}

	this.delete = function()
	{
		delete userRamArray;
		numberOfUsersInRam = 0;
		delete this;
	}

}


exports.User = User;
exports.UserSession = UserRamDatabase;

