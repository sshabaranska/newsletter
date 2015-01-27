'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	newsletter = require('../../app/controllers/newsletter.server.controller');

module.exports = function(app) {
	// Newsletter Routes
	app.route('/home')
		.get(newsletter.list)
		.post(users.requiresLogin, newsletter.create);

	app.route('/newsletter/:newsletterId')
		.get(newsletter.read)
		.put(newsletter.update);

	// Finish by binding the newsletter middleware
	app.param('newsletterId', newsletter.newsletterByID);
};