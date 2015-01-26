'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	Category = mongoose.model('Category'),
	_ = require('lodash');

/**
 * Create a category
 */
exports.categoryCreate = function(req, res) {
	var category = new Category(req.body);

	category.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(category);
		}
	});
};

/**
 * Show current category
 */
exports.categoryRead = function(req, res) {
	res.json(req.category);
};

/**
 * Category middleware
 */
exports.categoryByID = function(req, res, next, id) {
	Category.findById(id).populate('categoryName', '_id').exec(function(err, category) {
		if (err) return next(err);
		if (!category) return next(new Error('Failed to load category ' + id));
		req.category = category;
		next();
	});
};
