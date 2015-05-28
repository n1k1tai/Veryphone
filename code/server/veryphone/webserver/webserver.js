var debugModule = require('./../interface/debug');
debug = new debugModule.debug(true, true, 'log.txt');
debug.alertDebug("Veryphone web function started", false, true);

var userSessionModule = require('./../user_session/user_session.js');

function init()

{
	// Notifying server init :
	debug.alertDebug("Web server init", false, false);

	express = require('express');
	var app = express();

	// Body parser init :

	var bodyParser = require('body-parser');
	app.use(bodyParser());

	// User session init :

	var session = require('express-session');
	app.use(session({secret: 'sessionpass'}));

	app.use(express.static('/home/nikita/Scripting/Veryphone/code/website'));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	//Adding a session middleware :
	
	app.use(function (req, res, next) {
  		userSessionModule.processUserRequest(req.session);
  		next();
	});

	//Adding a logging middleware :

	app.use(function (req, res, next) {
  		debug.alertDebug("Incoming request on page" + req.baseUrl + "by " req.session.user.email + " from " req.ip);
  		next();
	});


	// Get Routes listing :
	app.get('/', function(req, res) {
    res.render('main.ejs');

	})

	.get('/inscription', function(req, res){
	res.render('inscription.ejs');

	})

	.get('/connexion', function(req, res){
	res.render('connexion.ejs');

	})


	// Post Routes listing :
	.post('/connexion', function(req, res){

	// Getting the request parameters
  	var reqEmail = req.body.email;
  	var reqPassword = req.body.password;

  	userSessionModule.processLoginRequest(reqEmail, reqPassword, req.session);

  	res.render('connexion.ejs');

  	
  	// Ejs rendering :
	})



	// 404 Route
	.use(function(req, res, next){
	var error = "404 : request on a page or ressource that doesn't exists. Ressource was :"
	error += req.url;
	debug.alertDebug(error, true, false);

	res.render('404.ejs');
	});

	


	

	app.listen(80);
}

exports.init = init;
