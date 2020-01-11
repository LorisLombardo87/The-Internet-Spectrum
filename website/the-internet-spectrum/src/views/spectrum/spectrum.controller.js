define([
	'mconfig/app',
	'qlik'
], function (app, qlik) {
	
	app.controller('SpectrumCtrl', ['$scope', SpectrumCtrler])
	
	function SpectrumCtrler($scope) {

		$scope.qlikApp = qlik.currApp();

	}
});
