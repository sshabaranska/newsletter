'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Newsletter = mongoose.model('Newsletter'),
	_ = require('lodash'),
	nodemailer = require('nodemailer');

/**
 * Create a newsletter
 */
exports.create = function(req, res) {
	var newsletter = new Newsletter(req.body);
	newsletter.user = req.user;

	newsletter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(newsletter);
		}
	});
};

/**
 * Show the current newsletter
 */
exports.read = function(req, res) {
	res.json(req.newsletter);
};

/**
 * Update a newsletter
 */
exports.update = function(req, res) {
	var newsletter = req.newsletter;
	console.log('Update newsletter1: ' + newsletter);
	newsletter = _.extend(newsletter, req.body);
	console.log('Update newsletter2: ' + newsletter);
	newsletter.save(function(err) {
		if (err) {
			console.log('Error: ' + err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(newsletter);
		}
	});
};

/**
 * List of newsletters
 */
exports.list = function(req, res) {
	Newsletter.find().exec(function(err, newsletter) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(newsletter);
		}
	});
};

/**
 * Newsletter middleware
 */
exports.newsletterByID = function(req, res, next, id) {
	Newsletter.findById(id).exec(function(err, newsletter) {
		if (err) 
			return next(err);
		if (!newsletter) 
			return next(new Error('Failed to load newsletter ' + id));
		req.newsletter = newsletter;
		next();
	});
};

/**
 * Newsletter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.newsletter.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

/** ===================================================================================================
 * Newsletter mailer
 * The below functionality provide mails sending according to the assigned followers to each Newsletter.
 * Mails will be send every Friday at 18:00. To the each follower will be send one mail with short
 * descriptions of all Newsletters to which he is assigned.
 * P.S. Keep calm when you try to understand this code,
 *      I hope you don't know where I live =)
 */

 // create reusable transporter object using SMTP transport
 var transporter = nodemailer.createTransport({
 	service: 'Gmail',
 	auth: {
 		user: 'sisi.development@gmail.com',
 		pass: 'sisi1234'
 	}
 });

// Set e-mail data and send e-mail 
function sendMail (error, data) {
	if(error)
		return console.log(error);

    var allFollowers = []; // For storing all followers mails 

	// Gather all mails in one array and remove all duplicate 
	function findUnique () {
		var unique = []; // For storing only unique followers mails

		// Gather all mails in one array
		for (var z = 0; z < data.length; z++) {
			allFollowers.push(data[z].followers.split(', '));
		}	

		// Gather all mails in one dimensional array
		for (var j = 0; j < allFollowers.length; j++) {
			for (var h = 0; h < allFollowers[j].length; h++) {
				unique.push(allFollowers[j][h]);
			}
		}

		// Remove all duplicate mails
		var arr = [];
		l:for (var x = 0; x < unique.length; x++) {
			for (var y = 0; y < arr.length; y++) {
				if(arr[y] === unique[x]) {
					continue l;
				}
			}
			arr[arr.length] = unique[x];
		}
		return arr;	
	}

	var followers = findUnique();
	console.log(followers);
	// For storing mail body content
	var mailBody = '';

	// Organise mail body
	for (var n = 0; n < followers.length; n++) {
		l:for (var i = 0; i < data.length; i++) {
			for (var m = 0; m < allFollowers[i].length; m++) {
				if (allFollowers[i][m] === followers[n]) {

					mailBody += '<h2><a href="http://localhost:3000/#/addnews/' + data[i]._id + '/">' + data[i].newslettertitle + '</a></h2>' +
					            '<p>' + data[i].newsletterdescription + '</p>';

					for (var k = 0; k < data[i].news.length; k++) {
						mailBody += '<ul><li><h3>' + data[i].news[k].title + '</h3></li></ul>';
					}

					continue l;
				}				
			}
		}

		// Setup and send e-mail after all data had gathered for current followers[n]
		var mailOptions = {
			from: 'sisi.development@gmail.com',    // sender
		 	to: followers[n],                      // receivers
		 	subject: 'The N-iX times',
		 	html: mailBody + '<h4>Best regards,<br> SiSi team</h4>'
		};

		send(mailOptions);

		mailBody = ''; // Erase mail body for the next followers[n]	
	}

	// Function for send mail after all settings have set
	function send (mailOptions) {
		transporter.sendMail(mailOptions, function(error, info) {
		 	if(error) {
		 		console.log(error);
		 	} else {
		 		console.log('Mail sent:' + info.response);
		 	}
		});
	}
	// Set timeout till next Friday 18:00
	setDelay();

}

// Today date
var nowDate = new Date();

// Mails sender fire time every Friday at 18:00
function setDelay() {
	// Up to date
	nowDate = new Date();
	// Calculate timeout till 18:00
	var leftTo1800 = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 18, 0, 0, 0) - nowDate;
	// Set timeout till 18:00
	if (leftTo1800 < 0)
		leftTo1800 += 604800000; // too late, try at next Friday =) 
	console.log(leftTo1800);
	setTimeout(function(){Newsletter.find(sendMail);}, leftTo1800);
}

// Check if today is Friday == 5
if (nowDate.getDay() === 5) {
	setDelay();
}

// ============================================================================================







	
