'use strict';

angular.module('newsletter').controller('PageController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		$scope.authentication = Authentication;
		$scope.hideCreateField = true;
		console.log($scope.authentication);

		// Show Create Newsletter field if role:Admin
		(function showCreateNewsletterField() {
			if($scope.authentication.user.roles == 'admin')
				$scope.hideCreateField = false;
		})();

		// hardcoded just for example
		$scope.contentNewsLetters = [    // content of all Newsletter
			{
				'title': 'JavaScript',
				'creator': 'Sviat',
				'description': 'blalblalbiyyyyyyyyyoooooototo',
				'followers': 'bla@bla.com, bla@bla.com'
			},
			{
				'title': 'Angular JavaScript',
				'creator': 'Svitlana',
				'description': 'blalblalbiyyyyyyyyyoooooototo',
				'followers': 'bla@bla.com, bla@bla.com'
			},
			{
				'title': 'Node JavaScript',
				'creator': 'Dima',
				'description': 'blalblalbiyyyyyyyyyoooooototo',
				'followers': 'bla@bla.com, bla@bla.com'
			}
		];

		// If user is signed in then redirect back home
		if ($scope.authentication.user) {

			$location.path('/page');
		} else {
			$location.path('/');
		}

		// Add new Newsletter
	    $scope.addNewsLetter = function() {
	    	var newItem = {
	    		'title': $scope.newNewsletter,
	    		'creator': $scope.authentication.user,
	    		'description': $scope.newsLetterDescription,
	    		'followers': $scope.followers
	    	};
	    	console.log(newItem);
	    	$scope.contentNewsLetters.push(newItem);
	    	$scope.newsletter = '';
	    	$scope.newsLetterDescription = '';
	    	$scope.showDescr = false;
	    	$scope.newNewsletter = '';
	    	newItem = {};

    	};


	}
]);