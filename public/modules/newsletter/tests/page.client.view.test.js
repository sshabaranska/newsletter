'use strict';

(function() {
	// PageController controller Spec
	describe('PageController', function() {

		// Initialize global variables
		var PageController,
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
			PageController = $controller('PageController', {
				$scope: scope
			});
		}));


		it('should contain an Authentication service', function() {
			expect($Authentication).not.toBe(null);
		});

		it('should not create new Newsletter if all fields are not filled', function() {
			// if all fields are empty
			scope.item = '';
			scope.addNewsLetter();
			expect(scope.error).toEqual('All fields are required');
			scope.error = '';
			// if only newslettertitle field is empty
			scope.item.newslettertitle = '';
			scope.item.newsletterdescription = 'Some description';
			scope.item.followers = 'Some followers';
			scope.addNewsLetter();
			expect(scope.error).toEqual('All fields are required');
			scope.error = '';
			// if only description field is empty
			scope.item.newslettertitle = 'Some title';
			scope.item.newsletterdescription = '';
			scope.addNewsLetter();
			expect(scope.error).toEqual('All fields are required');
			scope.error = '';			
			// if only description followers is empty
			scope.item.newsletterdescription = 'Some description';
			scope.item.followers = '';
			scope.addNewsLetter();
			expect(scope.error).toEqual('All fields are required');
			scope.error = '';	
		});

		it('if user signed in then redirect back home', function() {

			scope.authentication.user = 'Sisi';
			scope.authentication.user.roles = 'admin';
			console.log(scope.authentication);
			//expect($location.url()).toEqual('/page');
			//scope.authentication = null;
			//expect($location.url()).toEqual('/');
			//expect(scope.showCreateField()).toEqual(true);
		});

	});
}());

