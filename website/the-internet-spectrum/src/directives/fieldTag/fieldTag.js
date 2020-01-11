define(['angular','mconfig/app'], function(angular,app){

	app.directive("fieldTag", fieldTag);

	function fieldTag() {
		return {
			restrict: "E",
			templateUrl : './src/directives/storeAction/fieldTagTemplate.html',
			scope: {
				countrySelected: '=',
				campaignSelected: '=',
				calendarWeek: '=',
				campaignWeek: '='
			},

			link: function(scope, elem, attrs) {


	//			console.log('FIELD TAG');

				$scope.clearSelection = function (cell) {
	//				console.log(cell);	
					if(cell.field.fldname == "Country"){
						country.clear();
					}
					else if(cell.field.fldname == "Campaign Name"){
						campaign.clear();
					}
					else if(cell.field.fldname == "Calendar week"){
						calendarWeek.clear();
					}
					else if(cell.field.fldname == "Campaign week"){
						campaignWeek.clear();
					}
				};

			}
		}
	};
});