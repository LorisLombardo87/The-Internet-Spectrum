define(['angular','mconfig/app'], function(angular,app){

	app.directive("variableButton", variableButton);

	function variableButton() {
		return {
			restrict: "E",
			templateUrl : './src/directives/variableButton/variableButtonTemplate.html',
			scope: {
				qlikApp: '=',
				variableName : '=',
				valueToSelect: '=',
				buttonLabel: '=',
				buttonStyle: '='
			},

			link: function(scope, elem, attrs) {

				//scope.buttonStyle = scope.buttonStyle?scope.buttonStyle:'buttons';

				scope.qlikApp.createCube({
					"qInitialDataFetch": [
						{
							"qHeight": 1,
							"qWidth": 1
						}
					],
					"qDimensions": [],
					"qMeasures": [
						{
							"qDef": {
	//							"qDef": "=voutcomes"
								"qDef": "="+scope.variableName
							},
	//						"qLabel": "$(voutcomes)",
							"qLabel": "$("+ scope.variableName + ")",
							"qLibraryId": null,
							"qSortBy": {
								"qSortByState": 0,
								"qSortByFrequency": 0,
								"qSortByNumeric": 0,
								"qSortByAscii": 1,
								"qSortByLoadOrder": 0,
								"qSortByExpression": 0,
								"qExpression": {
									"qv": " "
								}
							}
						}				
					],
					"qSuppressZero": false,
					"qSuppressMissing": false,
					"qMode": "S",
					"qInterColumnSortOrder": [],
					"qStateName": "$"
				},settingsCallBack);

				function  settingsCallBack(reply, app){
					scope.selected = reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText;
	/*
					console.log('scope.variableName',scope.variableName);

					console.log('varValue:', reply.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
					console.log('scope.valueToSelect:', scope.valueToSelect);
					console.log(scope.buttonLabel);
	*/				
				};

				scope.clickHandler = function(valueToSelect){

	//				console.log(scope.variableName, valueToSelect);

					scope.active = true;
					scope.qlikApp.variable.setStringValue(scope.variableName, ''+valueToSelect);
					
		
				};

			}
		}
	};
});