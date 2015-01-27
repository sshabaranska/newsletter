'use strict';

angular.module('newsletter').controller('PageController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {

		$scope.authentication = Authentication;
		$scope.item = {};
		$scope.newsletterList = [];

		init();

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

		// Add new Newsletter
	    $scope.addNewsLetter = function() {

	    	if (!$scope.item.newslettertitle || $scope.item.newslettertitle === '' || 
	    		!$scope.item.newsletterdescription || $scope.item.newsletterdescription === '' ||
	    		!$scope.item.followers || $scope.item.followers === '') {
	    		
	    		$scope.error = 'All fields are required';
	    		return $scope.error;
	    	}
	    	$scope.item.creator = $scope.authentication.user._id;
	    	console.log($scope.item);
	    	
	    	$http.post('/home', $scope.item).success(function(response) {

				$scope.newsletterList.push(response);
				$scope().$apply();
			}).error(function(response) {
				$scope.error = response.message;
			});
    	};

    	// Init data
    	function init() {
    		$http.get('/home').success(function(response) {

				$scope.newsletterList = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
    	}
	}

]);