//============ PASSPORT ==============
var LocalStrategy = require('passport-local').Strategy,
	User          = require('./../models/user').User;  // user model

	module.exports = function(passport){
		
		// used to serialize the user for the session
	    passport.serializeUser(function(user, done) {
	    	console.log(user);
	        done(null, user.id);
	    });

	    // used to deserialize the user
	    passport.deserializeUser(function(id, done) {
	        User.findById(id, function(err, user) {
	        	console.log(user);
	            done(err, user);
	        });
	    });


	    // signup ==================
	    passport.use('local-signup', new LocalStrategy({
	    	usernameField: 'username',
	    	passwordField: 'password',
	    	passReqToCallback: true
		    },
		    // callback with username & password from form
		    function(req, username, password, done) {
		    	//process.nextTick(function(){
		    		// checking if user with this username exists
		    		User.findOne({'local.username': username}, function (err, user) {
		    			console.log(user, err);
		    			if(err)
		    				return done(err);
		    			if(user){
		    				return done(null, false, req.flash('signupMessage', 'Not valid name'));
		    			} else {
		    				//create the new user
		    				var newUser = new User();
		    				// set the user data
		    				newUser.local.username = username;
		    				newUser.local.password = newUser.generateHash(password);
		    				// save the user
		    				newUser.save(function(err){
		    					if(err)
		    						throw err;
		    					return done(null, newUser);
		    				});
		    			}
		    		});
		    	//});
		    }
		));

	    // login ===================
	    passport.use('local-login', new LocalStrategy({
		    	usernameField: 'username',
		    	passwordField: 'password',
		    	passReqToCallback: true
		    },
	    	// callback with username & password from form
		    function(req, username, password, done){
		    	// cheking if user trying to login exists
		    	User.findOne({'local.username': username}, function (err, user){
		    		console.log(user);
		    		if(err)
		    			return done(err);
		    		//if no user found return the message
		    		if(!user)
		    			return done(null, false, req.flash('loginMessage', 'No user found.'));
		    		// check if password is valid
		    		if (!user.validPassword(password))
		    			return done(null, false, req.flash('loginMessage', 'Wrong password.'));
		    		// return user if all data is valid
		    		return done(null, user);
		    	})
		    }
		));
	};


	