var express  	 = require('express'),
	cookieParser = require('cookie-parser'),
 	bodyParser   = require('body-parser'),
 	passport     = require('passport'),
 	flash    	 = require('connect-flash'),
 	session      = require('express-session'),
 	app          = express();

// set all environments =======================
function start(config) {
	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(cookieParser());       // read cookies (needed for auth)
	app.use(bodyParser());         // get information from html forms
	app.use(flash());              // use connect-flash for flash messages stored in session

	//required for passport ====================
	app.use(session({ secret: 'Dazdranagon' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

	//config. routes ===========================
	require('./../app/routes')(app, passport);

	// launch server ============================
	app.listen(config.port);
	console.log('The magic happens on port ' + config.port);
}

module.exports.start = start;