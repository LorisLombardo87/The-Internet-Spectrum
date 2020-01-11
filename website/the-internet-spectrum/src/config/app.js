define([
	'angular',
	'uirouter',
	'angularBootstrap',
	'infiniteScroll',
	'angularEnvironment'
], function (angular) {
	return angular.module('TheInternetSpectrum', [
		'ui.router', 
		'ui.bootstrap',
		'infinite-scroll',
		'environment'
	]);
});
