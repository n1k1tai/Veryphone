var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');

function User(email, password, firstName, lastName)
{
	this.email = email;
	this.firstName = firstName;
	this.lastName = lastName

	var password_ = password;
	


	function checkPassword(hash)
	{
		if (hash == password_) return true;
		else return false;
	}

	function setNewPassword(password)
	{
		password_ = password;
	}

}

function User

exports.User = User;