'use strict';

angular.module('newsletter').controller('PageController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		$scope.authentication = Authentication;
		$scope.item = {};
		$scope.newsletterList = [];
		
		// If user is signed in then redirect back home
		if ($scope.authentication.user) {
			console.log($scope.authentication);
			$location.path('/page');
		} else {
			$location.path('/');
		}

		// Show Create Newsletter field if role:Admin
		$scope.showCreateField = function() {
			return ($scope.authentication.user.roles[0] === 'admin');
		};

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

		// Add new Newsletter
	    $scope.addNewsLetter = function() {
	    	/*var newItem = {
	    		'title': $scope.newNewsletter,
	    		'creator': $scope.authentication.user,
	    		'description': $scope.newsLetterDescription,
	    		'followers': $scope.followers
	    	};*/
	    	$scope.item.creator = $scope.authentication.user;
	    	console.log(item);
	    	
	    	$http.post('/home', $scope.item).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.newsletterList.push(response);

			}).error(function(response) {
				$scope.error = response.message;
			});


	    	$scope.newsletterList.push(item);
	    	$scope.newsletter = '';
	    	$scope.newsLetterDescription = '';
	    	$scope.showDescr = false;
	    	$scope.newNewsletter = '';
	    	newItem = {};

    	};
	}
]);