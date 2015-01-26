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
	newslettertitle: {
		type: String,
		required: true
	},
	newsletterdescription: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	news: [
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
				required: 'Description cannot be blank'
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
	followers: {
		type: String,
		default: '',
		trim: true
	}
});

mongoose.model('Newsletter', NewsletterSchema);