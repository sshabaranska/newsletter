'use strict';

(function() {
	// AddNewsController controller Spec
	describe('AddNewsController', function() {

		// Initialize global variables
		var AddNewsController,
			scope,
			$Authentication,
			$httpBackend,
			$stateParams,
			$location;

		
		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Authentication) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			$Authentication = Authentication; // Authentication service for user variables

			// Initialize the PageController controller
			AddNewsController = $controller('AddNewsController', {
				$scope: scope
			});
		}));

		it('should contain an Authentication service', function() {
			expect($Authentication).not.toBe(null);
		});

	});
}());