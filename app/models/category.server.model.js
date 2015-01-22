'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Newsletter Schema
 */
var CategorySchema = new Schema({
	categoryName: {
		type: String,
		required: true
	},
	group: [{
			type: String,
			default: '',
			trim: true
	}]
});

mongoose.model('Category', CategorySchema);