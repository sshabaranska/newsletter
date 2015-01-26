'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	newsletter = require('../../app/controllers/newsletter/newsletter.server.controller'),
	category = require('../../app/controllers/newsletter/category.server.controller');

module.exports = function(app) {
	// Newsletter Routes
	app.route('/newsletterList')
		.get(newsletter.list)
		.post(users.requiresLogin, category.categoryCreate, newsletter.create);

	app.route('/newsletter/:newsletterId/:categoryId')
		.get(newsletter.read, category.categoryRead)
		.put(users.requiresLogin, newsletter.hasAuthorization, newsletter.update);


	// Finish by binding the newsletter middleware
	app.param('newsletterId', newsletter.newsletterByID);
	app.param('categoryId', category.categoryByID);
};