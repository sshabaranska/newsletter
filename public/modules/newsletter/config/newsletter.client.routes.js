'use strict';

// Setting up route
angular.module('newsletter').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('page', {
			url: '/page',
			templateUrl: 'modules/newsletter/views/page.client.view.html'
		}).
		state('addnews', {
			url: '/addnews/:newsletterID/',
			templateUrl: 'modules/newsletter/views/addnews.client.view.html'
		})
	}
]);