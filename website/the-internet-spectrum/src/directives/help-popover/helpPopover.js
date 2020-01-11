// define(['angular','mconfig/app'], function(angular,app){
// 	app.directive("helpPopover", helpPopover);
// 	function helpPopover() {
// 		return {
// 			restrict: "A",
// 			scope: {
// 				helpPopoverContent: '=',
// 				helpPopoverPlacement: '=',
// 				helpPopoverHtml: '=',
// 				helpPopoverTitle: '='
// 			},
//
// 			link: function(scope, elem, attrs) {
//
// 				console.log('helpPopoverContent', scope.helpPopoverContent);
//
// 				scope.$watch('helpPopoverContent', function(newValue, oldValue) {
//
// 					if(newValue){
// 						console.log('newValue', newValue);
// 						$(elem[0]).popover('destroy');
// 						var options = {
// 							'content':scope.helpPopoverContent,
// 							'placement':scope.helpPopoverPlacement,
// 							'trigger':'hover',
// 							'html':scope.helpPopoverHtml|false,
// 							'title':scope.helpPopoverTitle?scope.helpPopoverTitle:''
// 						};
// 						$(elem[0]).popover(options);
// 					}
//
// 				});
//
// 			}
// 		}
// 	};
// 	return helpPopover;
// });

define(['angular','mconfig/app'], function(angular,app){

	app.directive("helpPopover", helpPopover);

	function helpPopover() {
		return {
			restrict: "E",
			templateUrl : './src/directives/help-popover/helpPopoverTemplate.html',
			scope: {
				popoverTitle: '=',
				popoverText: '=',
				popoverPlacement: '='
			},

			link: function(scope, elem, attrs) {

//
// 				scope.$watch('popoverText', function(newValue, oldValue) {
//
// 				if(newValue){
//
// 				// $(elem[0]).popover('destroy');
// 					var options = {
// 						'content':scope.popoverPlacement,
// 						'placement':scope.popoverPlacement,
// 						'trigger':'hover',
// 						'html':true,
// 						'title':scope.popoverTitle?scope.popoverTitle:''
// 					};
// //					console.log('options',options);
//
// 					$(elem[0]).popover(options);
// 				}
//
// 			});


			}
		}
	};
});
