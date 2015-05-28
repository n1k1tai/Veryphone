var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

function user(email, password, firstName, lastName)
{
	this.email = email;
	this.firstName = firstName;
	this.lastName = lastName

	var password_ = password;
	


	checkPassword : function(hash)
	{
		if (hash == password_) return true;
		else return false;
	}

	function setNewPassword(password)
	{
		password_ = password;
	}

};


module.exports = user;