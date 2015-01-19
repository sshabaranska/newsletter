'use strict';

// Setting up route
angular.module('users').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');
		// Users state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('page', {
			url: '/page',
			templateUrl: 'modules/users/views/page/page.client.view.html'
		});
	}
]);