'use strict';

angular.module('newsletter').controller('AddNewsController', ['$scope', '$http', 'Authentication',
	function($scope, $http, Authentication) {

		$scope.authentication = Authentication;
		console.log($scope.newsletterID);
		$scope.newsletterNews = [
			{
				"title": "JavaScript patterns",
				"creator": "Admin",
				"description": "recommended book for reading - 'Learning JavaScript Design Patterns' (A book by Addy Osmani)",
				"show": false
			},
			{
				"title": "Bla bla",
				"creator": "Admin",
				"description": "Bla bla bla bla bla bla bla bla bla bla......!!!! ",
				"show": false
			}
		];

		// Add new News to Newsletter
		$scope.addNews = function() {
			var newNews = {
				"title": $scope.title,
				"creator": $scope.authentication.user.email,
				"description": $scope.description,
				"show": false
			}

			$scope.newsletterNews.push(newNews);
			newNews = {};
			$scope.title = "";
			$scope.description = "";
		};

		// Hide and show description for news
		$scope.showDescription = function(showIndex) {
			$scope.newsletterNews[showIndex].show = !$scope.newsletterNews[showIndex].show;
		};
	}
]);

