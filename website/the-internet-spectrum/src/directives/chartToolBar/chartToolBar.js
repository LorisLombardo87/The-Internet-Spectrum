define(['angular','mconfig/app'], function(angular,app){

	app.directive("chartToolBar", chartToolBar);

	function chartToolBar() {
		return {
			restrict: "E",
			templateUrl : './src/directives/chartToolBar/chartToolBarTemplate.html',
			scope: {
				helpPopoverPlacement: '=',
				helpPopoverContent: '=',
				helpPopoverHtml : '=',

				printPicture: '=',

				exportTable: '=',
				qlikApp: '='
			},

			link: function(scope, elem, attrs) {

				scope.printPictureLocal= function(){
					scope.printPicture(elem[0].parentNode);
				}

				scope.exportTableLocal = function () {
					scope.qlikApp.getObject(scope.exportTable).then(function (vizModel) {
						vizModel.exportData().then(function( reply ) {  
	//			            console.log('qUrl', reply);  
				            window.open(reply.qUrl);  
				        });
					});
				}
			}
		}
	};
});