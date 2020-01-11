define(['angular','mconfig/app'], function(angular,app){

	app.directive("currentSelections", currentSelections);

	function currentSelections(){
		return {
			restrict: "A",
			
			scope: {
				currentSelections : '='
			},
			
			link: function(scope, element, attrs) {
				
				scope.$watch('currentSelections', function (newValue, oldValue) {
					if(typeof scope.currentSelections != 'undefined') {
						scope.currentSelections.getObject(element, 'CurrentSelections');
					}
				});
				
			}
		}
	};

});