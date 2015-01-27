'use strict';

angular.module('newsletter').controller('AddNewsController', ['$scope', '$http', '$stateParams', 'Authentication', 
	function($scope, $http, $stateParams, Authentication) {

		$scope.authentication = Authentication;
		$scope.id = $stateParams.newsletterID;

		$scope.newsletter = {};
		$scope.news = {};
		init();

		// Add new News to Newsletter
		$scope.addNews = function(el) {
			$scope.news.addedBy = $scope.authentication.user.email;
			$scope.item = JSON.parse(JSON.stringify($scope.news))
			$scope.newsletter.news.push($scope.item);

			$http.put('newsletter/' + $scope.id, $scope.newsletter).success(function(response) {

			}).error(function(response) {
				$scope.error = response.message;
			});
			$scope.news.title = '';
			$scope.news.content = '';
		};

		// Hide and show description for news
		$scope.showDescription = function(showIndex) {
			$scope.newsletter.news[showIndex].show = !$scope.newsletter.news[showIndex].show;
		};

		function init() {
			$http.get('/newsletter/' + $scope.id).success(function(response) {

				$scope.newsletter = response;

			}).error(function(response) {
				$scope.error = response.message;
			});
		}
	}
]);

