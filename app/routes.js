//============= routes ===============
module.exports = function(app, passport) {

	// home page =====================
	app.get('/', function(req, res) {
		res.render('index.ejs', {user: req.user}); // load index.ejs file and pass user to template
	});

	// login page ====================
	app.get('/login', function(req, res) {
		// check  if the user is already logged, if yes skip login
		if(req.isAuthenticated())
			res.redirect('/profile');
			
		// show message if wrong login
		res.render('login.ejs', {message: req.flash('loginMessage') }); // pass to template
	});

	// handling the login form
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login',   // redirect back to the signup page if there is an error
        failureFlash : true           // allow flash messages
    }));

	// signup page ===================
	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	});

	// handling the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	// profile pade ==================
	// isLoggedIn - check if user loggedin
	app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {user : req.user}); // get the user and pass to template
    });

    // logout ========================
    app.get('/logout', function(req, res) {
    	req.logout();
    	res.redirect('/');
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
