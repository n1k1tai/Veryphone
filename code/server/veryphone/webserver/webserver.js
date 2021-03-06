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

  		if (req.session.user == undefined) res.dataEJS = {
  			connected : false
  		};
  		else res.dataEJS = {
  			connected : true,
  			firstName : req.session.user.firstName,
  			lastName : req.session.user.lastName	
  		};

  		next();
	});

	//Adding a logging middleware :

	app.use(function (req, res, next) {
		var user_name;
		if (req.session.user == undefined) user_name = "visitor";

		else user_name = req.session.user.firstName + " " + req.session.user.lastName + " on login " + req.session.user.email;
  		debug.alertDebug("Incoming request on page " + req.originalUrl + " by " + user_name + " from " + req.ip);
  		next();
	});


	// Get Routes listing :
	app.get('/', function(req, res) {

    res.render('main.ejs', res.dataEJS);

	})

	.get('/inscription', function(req, res){

	if (req.session.user != undefined) userSessionModule.processSignOutRequest(req.session);
	res.render('inscription.ejs', res.dataEJS);

	})

	.get('/connexion', function(req, res){
	res.render('connexion.ejs', res.dataEJS);

	})

	.get('/presentation', function(req, res){
	res.render('presentation.ejs', res.dataEJS);

	})


	// Post Routes listing :
	.post('/connexion', function(req, res){

	// Getting the request parameters
  	var reqEmail = req.body.email;
  	var reqPassword = req.body.password;

  	if (userSessionModule.processSignInRequest(reqEmail, reqPassword, req.session))
  	{
  		res.status(200).json({'msg':'redirect','location':'/'});
  	}
	
	else
  	{
  		res.status(200).json({'msg':'redirect','location':'/connexion'});
 	}

	})

	.post('/inscription', function(req, res){

	// Getting the request parameters
  	var reqEmail = req.body.email;
  	var reqPassword = req.body.password;
  	var reqFirstName = req.body.firstName;
  	var reqLastName = req.body.lastName;

  	if(userSessionModule.processSignUpRequest(reqEmail, reqPassword, reqFirstName, reqLastName)) 
  	{
  		res.status(200).json({'msg':'redirect','location':'/presentation'});
  		userSessionModule.processSignInRequest(reqEmail, reqPassword, req.session);
  	}

  	else {
  		res.status(200).json({'msg':'redirect','location':'/inscription'});
  	}

	})

	.post("/", function(req, res){

	// Getting the request parameters
  	var signout = req.body.signout;
  	debug.alertDebug(signout);
  	

  	if (signout == "true") 
  	{
  		userSessionModule.processSignOutRequest(req.session);
  		res.status(200).json({'msg':'redirect','location':'/'});
  	}
  		

  	
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
