define(['angular','mconfig/app'], function(angular,app){

	app.directive("funnelChart", funnelChart);

	function funnelChart($window) {
		return {
			restrict: "E",
			templateUrl : './src/directives/funnelChart/funnelChartTemplate.html',
			scope: {
				title:'=',
				steps: '=',
				color1:'=',
				color2:'=',

				textColor:'=',

			},

			link: function(scope, elem, attrs) {

				scope.width = elem[0].parentElement.clientWidth;
				scope.funnelHeight = 50;
				scope.linkHeight = 20;

				scope.stepGap = 30;
				scope.slope = 10;

				scope.gap = 40;

				scope.totalHeight = 0;
				

				scope.getColor = function (ratio){

					var ratio = 1-(ratio);
					var hex = function(x) {
					x = x.toString(16);
					return (x.length == 1) ? '0' + x : x;
					};

					var r = Math.ceil(parseInt(scope.color1.substring(0,2), 16) * ratio + parseInt(scope.color2.substring(0,2), 16) * (1-ratio));
					var g = Math.ceil(parseInt(scope.color1.substring(2,4), 16) * ratio + parseInt(scope.color2.substring(2,4), 16) * (1-ratio));
					var b = Math.ceil(parseInt(scope.color1.substring(4,6), 16) * ratio + parseInt(scope.color2.substring(4,6), 16) * (1-ratio));

					return '#'+hex(r) + hex(g) + hex(b);
				}
				
				function drawFunnel(){

					var x = [10,9,8,7,6,5,4,3,2,1];



					scope.totalHeight = scope.steps.length*scope.funnelHeight+(scope.steps.length-1)*scope.linkHeight;

					//scope.textColor = '#'+ scope.color1;


					scope.steps.forEach(function(step,$index){

						function getBaseLog(y,x) {
							return Math.log(y) / Math.log(x);
						}

						var index = x[$index>10?10:$index];

						var indexGap = (scope.stepGap*getBaseLog(index,scope.slope));
						
						step.points = [];
						step.points[0]= ($index*scope.gap)							+','+	($index*(scope.funnelHeight+scope.linkHeight))
						step.points[1]= (scope.width-($index*scope.gap))			+','+	($index*(scope.funnelHeight+scope.linkHeight))
						step.points[2]= (scope.width-($index*scope.gap)-indexGap)	+','+	(($index*(scope.funnelHeight+scope.linkHeight))+scope.funnelHeight)
						step.points[3]= (($index*scope.gap)+indexGap)				+','+	(($index*(scope.funnelHeight+scope.linkHeight))+scope.funnelHeight)

						step.link = (indexGap+scope.gap+($index*scope.gap))				+','+	(($index*(scope.funnelHeight+scope.linkHeight))+scope.funnelHeight)+ ' '+
									(scope.width-($index*scope.gap)-indexGap)		+','+	(($index*(scope.funnelHeight+scope.linkHeight))+scope.funnelHeight)+ ' '+
									(scope.width-(($index+1)*scope.gap)-indexGap)	+','+	(($index+1)*(scope.funnelHeight+scope.linkHeight)) +' '+
									(($index+1)*scope.gap)							+','+	(($index+1)*(scope.funnelHeight+scope.linkHeight))


						
						step.polygon = ''+step.points[0]+' '+step.points[1]+' '+step.points[2]+' '+step.points[3]+'';

						//step.color = '#b3ede8';
						step.strokeColor = scope.getColor(($index)/(scope.steps.length-1));
						step.color = scope.getColor(($index)/(scope.steps.length-1));
					});


	//				console.log('steps',scope.steps);
				};
				
				//drawFunnel();
				

				angular.element($window).bind('resize', function(){
		        	scope.width = elem[0].parentElement.clientWidth-(15*2);
		        	scope.$digest();
		        	drawFunnel();
		       	});

				scope.$watch('steps', function(newValue, oldValue) {
	                if (newValue)
	                    drawFunnel();
	            });
			}
		}
	};
});