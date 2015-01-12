//=============== SERVER =======================

var mongoose = require('mongoose'),
	passport = require('passport'),
	config 	 = require('./config/database');
	//port  		 = process.env.PORT || 8008; 

//======== Main application entry files ========

// connect to mongoDB ==================
var db = mongoose.connect(config.db);

// configure passport ==================
require('./config/passport')(passport);

// configure express ===================
var start_express = require('./config/express');
start_express.start(config);

// check if def. user exist(db exist)
var checkDB = require('./config/createDB').checkDB;
checkDB.createAdminUser();

