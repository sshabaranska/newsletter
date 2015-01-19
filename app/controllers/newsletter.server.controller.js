'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./newsletter/newsletter.server.controller'),
	require('./newsletter/category.server.controller')
);