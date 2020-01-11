define([
	'mconfig/app',
	'qlik'
], function (app, qlik) {
	
	app.controller('HomeCtrl', ['$scope','$state', OverviewController])
	
	function OverviewController($scope,$state) {

		$scope.qlikApp = qlik.currApp();

		$scope.colors = 'eWaCuJM';

		$scope.start = function(){
			console.log('start');
			$state.go('dashboard.spectrum', {});
		}
	}
});
