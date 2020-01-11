define([
	'mconfig/app',
	'qlik'
], function (app, qlik) {
	
	app.controller('SnapshotsCtrl', ['$scope', GanttController])
	
	function GanttController($scope) {

		$scope.qlikApp = qlik.currApp();

		$scope.qlikObjects = {
			table: {
				id: 'SSsrbD',
			}
		}
	}
});
