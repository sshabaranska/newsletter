'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Newsletter Schema
 */
var NewsletterSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	body: [
		{
			title: {
				type: String,
				default: '',
				trim: true,
				required: 'Title cannot be blank'
			},
			content: {
				type: String,
				default: '',
				trim: true,
				required: 'Title cannot be blank'
			},
			user: {
				type: Schema.ObjectId,
				ref: 'User'
			}
		}

	],
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	category: {
		type: String,
		required: true
	}

});

mongoose.model('Newsletter', NewsletterSchema);