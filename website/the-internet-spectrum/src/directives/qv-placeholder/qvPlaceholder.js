define(['angular','mconfig/app'], function(angular,app){

	app.directive("qvPlaceholder",['qCapability', qvPlaceholder]);
	function qvPlaceholder($qCapability)  {
		return {
			restrict: "EA",
			scope: {
				qvPlaceholder : '=',
				qlikApp: '=',
				keepAlive: '='
			},
			link: function(scope, element) {
				var _qsobj, _qsId;
				scope.$watch('qvPlaceholder', function (newValue, oldValue, scope) {
					// console.log('[qvPlaceholder] newval', newValue, 'oldValue', oldValue);
					if (scope.qvPlaceholder !== undefined) {
						element.empty();
						element.innerHTML = '<div>LOADING</div>';
						_qsobj = scope.qlikApp.getObject(element, scope.qvPlaceholder);  //, {noSelections: true}
						_qsobj.then(function (model) {
							//element.empty();
							if (model.layout.qInfo !== undefined)
								_qsId = model.layout.qInfo.qId;
						});
					}
				});
				scope.$on('$destroy', function () {
					if (scope.keepAlive) { 
						return;
					}
					scope.qlikApp.destroySessionObject(_qsId);
				});
			}
		}
	};

});
