define(['angular','mconfig/app'], function(angular,app){

	app.directive("kpiPlaceholder", kpiPlaceholder);

	function kpiPlaceholder() {
		return {
			restrict: "E",
			templateUrl : './src/directives/kpi-placeholder/kpiPlaceholderTemplate.html',
			scope: {
				kpiTitle : '=',
				kpiTableId: '=',
				kpiType: '=',
				kpiDescription: '=',
				kpiPeriodDescription: '=',
				kpiErrorMessage: '=',
				qlikApp:'='
			},

			link: function(scope, elem, attrs) {

				scope.kpiSelectedPeriod;
				scope.kpiHeaders=[];
				scope.kpiValues=[];


				scope.qsId = [];
				var _models = [];
				var _getData = function (model, callback) {
					model.getHyperCubeData('/qHyperCubeDef', [{
						"qTop": 0,
						"qLeft": 0,
						"qHeight": 20,
						"qWidth": 20
					}]).then(callback);
				}

				scope.qlikApp.getObject('detailTableKPI', scope.kpiTableId).then(function (model) {

					_models.push(model);
					for (var i = 0; i < model.enigmaModel.layout.qHyperCube.qMeasureInfo.length; i++) {
						scope.kpiHeaders.push(model.enigmaModel.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle);
					}

					_getData(model, callback);
					model.Validated.bind(function () {
						scope.kpiHeaders = [];
						for (var i = 0; i < model.enigmaModel.layout.qHyperCube.qMeasureInfo.length; i++) {
							scope.kpiHeaders.push(model.enigmaModel.layout.qHyperCube.qMeasureInfo[i].qFallbackTitle);
							//console.log(model.enigmaModel.layout.qHyperCube.qMeasureInfo[i]);
						}
						_getData(model, callback);
					});

					function callback(data) {
						scope.kpiValues = data[0].qMatrix;
						scope.qsId.push(scope.npsScoreKpi);
					}
				});

				scope.togglePeriod = function () {
					//console.log('scope.kpiSelectedPeriod', scope.kpiSelectedPeriod);

					switch (scope.kpiSelectedPeriod) {
						case 'Year':
							scope.qlikApp.variable.setStringValue('vSelectQuarter', 'Month');
							break;
						case 'Month':
							// console.log('ci passo');
							scope.qlikApp.variable.setStringValue('vSelectQuarter', 'Year');
							break;
						default:
							scope.qlikApp.variable.setStringValue('vSelectQuarter', 'Month');
					}

				}

				scope.qlikApp.createCube({
						"qInitialDataFetch": [
							{
								"qHeight": 1,
								"qWidth": 1
							}
						],
						"qDimensions": [],
						"qMeasures": [
							{ "qDef": { "qDef": "=vSelectQuarter" } }
						],
						"qSuppressZero": false,
						"qSuppressMissing": false,
						"qMode": "S",
						"qInterColumnSortOrder": [],
						"qStateName": "$"
				},settingsCallback);
				function settingsCallback(reply) {
					scope.kpiSelectedPeriod = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
					//console.log('scope.kpiSelectedPeriod', scope.kpiSelectedPeriod);
				}



				scope.isNumber= function (n) {
				//console.log('n',n);
				  return !isNaN(parseFloat(n)) && isFinite(n);
				}

			}
		}
	};
});
