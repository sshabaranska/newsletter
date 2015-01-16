'use strict';

angular.module('users').controller('PageController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) {

			$location.path('/page');
		} else {
			$location.path('/');
		}

	}
]);