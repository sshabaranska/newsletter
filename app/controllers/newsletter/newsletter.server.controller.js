'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	Newsletter = mongoose.model('Newsletter'),
	_ = require('lodash');

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

	newsletter = _.extend(newsletter, req.body);

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
 * List of newsletters
 */
exports.list = function(req, res) {
	Newsletter.find().sort('-created').populate('creator').exec(function(err, newsletter) {
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
	Newsletter.findById(id).populate('creator').exec(function(err, newsletter) {
		if (err) return next(err);
		if (!newsletter) return next(new Error('Failed to load newsletter ' + id));
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