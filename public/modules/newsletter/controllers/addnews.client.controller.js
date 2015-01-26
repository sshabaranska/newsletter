'use strict';

angular.module('newsletter').controller('AddNewsController', ['$scope', '$http', '$stateParams', 'Authentication', 
	function($scope, $http, $stateParams, Authentication) {

		$scope.authentication = Authentication;
		$scope.id = $stateParams.newsletterID;

		$scope.newsletter = {};
		init();

		// Add new News to Newsletter
		$scope.addNews = function() {
			var newNews = {
				'title': $scope.title,
				'creator': $scope.authentication.user.email,
				'description': $scope.description,
				'show': false
			};

			$scope.newsletterNews.push(newNews);
			newNews = {};
			$scope.title = '';
			$scope.description = '';
		};

		// Hide and show description for news
		$scope.showDescription = function(showIndex) {
			$scope.newsletterNews[showIndex].show = !$scope.newsletterNews[showIndex].show;
		};

		function init() {
			$http.get('/newsletter/ ' + $scope.id).success(function(response) {

				$scope.newsletter = response;
				$scope().$apply();

			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}
]);

