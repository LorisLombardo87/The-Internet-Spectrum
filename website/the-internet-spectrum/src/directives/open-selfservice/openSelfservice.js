define(['angular','mconfig/app'], function(angular,app){

	app.directive("openSelfservice", openSelfservice);

	function openSelfservice() {
		return {
			restrict: "E",
			templateUrl : './src/directives/open-selfservice/openSelfserviceTemplate.html',
			scope: {
				selfserviceLink: '='
			},

			link: function(scope, elem, attrs) {

			}
		}
	};
});
