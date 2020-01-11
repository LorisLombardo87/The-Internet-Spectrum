define(['angular','mconfig/app'], function(angular,app){

	app.directive("fieldButton", fieldButton);

	function fieldButton() {
		return {
			restrict: "E",
			templateUrl : './src/directives/fieldButton/fieldButtonTemplate.html',
			scope: {
				qlikApp: '=',
				fieldName : '=',
				valueToSelect: '=',
				buttonLabel: '='
			},

			link: function(scope, elem, attrs) {

				scope.active = false;

				var qsField = scope.qlikApp.field(scope.fieldName);
				//console.log('qsField',qsField);


				qsField.getData();

				qsField.OnData.bind( function(){
					//console.log('field button ',qsField);
					//console.log('valueToSelect', scope.valueToSelect);
					scope.active = false;
					if(scope.valueToSelect == 'ALL_VALUES' && qsField.stateCounts.qLocked==0){
						//console.log('ALL');

						scope.active = true;
					}
					else if(qsField.stateCounts.qLocked==1){

						//console.log('una selezione');

						for(var i =0; i<qsField.rows.length;i++){

						//console.log('qsField.rows[i].qText', qsField.rows[i].qText);
						//console.log('qsField.rows[i].qState', qsField.rows[i].qState);

							if(qsField.rows[i].qText==scope.valueToSelect && qsField.rows[i].qState=='L'){
								scope.active = true;
							}
						}
					}
				});


	/*
				scope.clickHandler = function(){
					if(scope.valueToSelect == 'ALL_VALUES'){
						qsField.unlock()
						qsField.clear();
						qsField.lock()
						//clearAll();
					}
					else{
						scope.select();
					}
				};
	*/
				scope.clickHandler = function(valueToSelect){

	//				console.log(scope.fieldName, valueToSelect);
					scope.active = true;
	//				scope.qlikApp.variable.setStringValue(scope.variableName, ''+valueToSelect);
					
					if(scope.valueToSelect == 'ALL_VALUES'){
						clearAll();
					}else{
						//qsField.unlock()
						qsField.selectValues([scope.valueToSelect], false,true);
						//qsField.lock()				
					}
				};


	/*

				scope.select = function(){
					qsField.unlock()
					qsField.selectValues([scope.valueToSelect], false,true);
					qsField.lock()
				};



				function clearAll(){
					qsField.clear();
				};

	*/			
			}
		}
	};
});



