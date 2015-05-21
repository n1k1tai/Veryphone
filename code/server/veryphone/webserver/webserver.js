var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');
debug.alertDebug("Veryphone web function started", false, true);

var userModule = require('./../user_session/user_session.js');

function init()

{
	// Notifying server init :
	debug.alertDebug("Web server init", false, false);

	express = require('express');
	var app = express();

	// User session init :

	var session = require('express-session');
	app.use(session({secret: 'sessionpass'}));


	app.use(express.static('/home/nikita/Scripting/Veryphone/code/website/'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');


	// Routes listing :
	app.get('/', function(req, res) {
	debug.alertDebug("We've got incoming request for main");
	var user = new userModule.User();
	user.getNumberOfUsers();
    res.render('main.ejs');


	})

	.get('/inscription', function(req, res){
	debug.alertDebug("We've got incoming request for inscription");



	res.render('inscription.ejs');


	})

	.get('/connexion', function(req, res){
	debug.alertDebug("We've got incoming request for connection");
	res.render('connexion.ejs');


	})


	.use(function(req, res, next){
	var error = "404 : request on a page or ressource that doesn't exists. Ressource was :"
	error += req.url;
	debug.alertDebug(error, true, false);

	res.render('404.ejs');
});

	app.listen(80);
}

exports.init = init;
