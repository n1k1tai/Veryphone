var fs = require('fs');
var colors = require('colors');

// Definition de la classe de debuggage :
function debug(display, writeToFile, filePath)
{
	if (typeof(display) === 'boolean') this.display = display;
	else display = true;

	if (typeof(writeToFile) == 'boolean') this.writeToFile = writeToFile;
	else writeToFile == false;

	if(writeToFile)
	{
		this.filePath = filePath;
	}
	
	this.alertDebug = function(string, error, finished)
	{
		if (writeToFile)
		{
			var toWrite="";
			if ((typeof(error) != "undefined") && error) toWrite += "[e]";
			else if ((typeof(finished) != "undefined") && finished) toWrite += "[ok]";
			else toWrite += "[info]";


			toWrite += " " + string + " at ";
			var now = new Date();
			toWrite += now.getHours() + "h" + now.getMinutes() + " and " + now.getSeconds() + " seconds";

			toWrite += "\n";
			fs.appendFile(filePath, toWrite, function(){});
		}

		if (display)
		{
			var toWrite="";
			if ((typeof(error) != "undefined") && error) toWrite += "[e]";
			else if ((typeof(finished) != "undefined") && finished) toWrite += "[ok]";
			else toWrite += "[info]";
			toWrite += " " + string ;

			if(error) console.log(toWrite.red);
			else if(finished) console.log(toWrite.green);
			else console.log(toWrite);

		}

	}

}

exports.debug = debug;

