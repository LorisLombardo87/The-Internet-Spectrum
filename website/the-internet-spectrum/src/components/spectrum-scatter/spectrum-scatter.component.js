
define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {

    app.component('spectrumScatter', {
        templateUrl: 'src/components/spectrum-scatter/spectrum-scatter.component.html',
        controller: BigKpiCtrl,
        bindings: {}
    })

    function BigKpiCtrl (qTableAdapter) {

        const self = this;

        self.loading = true;

        self.spectumScatter = "pfjtE";

        self.qlikApp = qlik.currApp();

        self.confirm = function(e){
           
            var xrange = scatterChart.component('rangeX');
            var yrange = scatterChart.component('rangeY');

            console.log(xrange,yrange);
            console.log(scatterChart.brush('range-scatter'));

        }

         self.reject = function(){
            scatterChart.brush('range-scatter').end();
            scatterChart.component('rangeY').emit('rangeClear');
            scatterChart.component('rangeX').emit('rangeClear');

            self.displayControl('none');
        }

        self.displayControl= function(show){
            control = document.querySelector('#chart-control-chartcontainer2');
            control.style.display = show;
        }

        var data = [{
            type: 'matrix',
            data: [
              ['site_color_id','hue','saturation','luminance','selected']
            ]
          }];

        const colors = {
            total: '#060',
            selected: '#5a5a5a'
        };

        function mouseEventToRangeEvent(e) {
            return {
              center: { x: e.clientX, y: e.clientY },
              deltaX: e.movementX,
              deltaY: e.movementY
            };
        };




        var hue_scale ={
            data: {
                field: 'hue',

            },
            invert: false,
        };
        var saturation_scale = {
            data: {
                field: 'saturation',

            },
            invert: true,
            min: 0,
            max: 1.01
        };

        var saturation_axis = {
            key:'saturation-axis',
            type: 'axis',
            dock: 'left',
            scale: 'saturation',
            formatter: {
                type: 'd3-number',
                format: ",.2r"
            },
            settings: {},
        };

        var saturation_text = {
            type: 'text',
            text: 'Saturation',
            dock: 'left'
        };

        var hue_axis = {
            key:'hue-axis',
            type: 'axis',
            dock: 'bottom',
            scale: 'hue',
            formatter: {
                type: 'd3-number',
                format: ",.2r"
            },
            settings:{
                ticks: { 
                    show: true, 
                    margin: 0, 
                    tickSize: 20,
                },
                minorTicks: {
                    show: true, 
                    tickSize: 5,
                    margin: 0,
                }
            }
        };

        var hue_grid = {
            type: 'grid-line',                      
            x: {
                scale: 'hue'
            },
            ticks: {
                show: true,
                stroke: '#5a5a5a',
                strokeWidth: 0.5
            },
            minorTicks: {
                show: true,
                stroke: '#5a5a5a',
                strokeWidth: 0.5,
                strokeDasharray: '3, 3'
            }
        };

        var site_color_point = {
            key: 'p',
            type: 'point',
            data: {
                extract: {
                    field: 'site_color_id',
                    props: {
                        saturation: { field: 'saturation' },
                        hue: { field: 'hue' },
                        luminance: { field: 'luminance' },
                        selected: { field: 'selected' },
                    }
                }
            },
            settings: {
                x: { scale: 'hue' , ref: 'hue'},
                y: { scale: 'saturation', ref:'saturation' },
                shape: 'circle',
                strokeWidth: 1.5,
                stroke: colors.selected,
                size: { fn: d => {return d.datum.selected.value==2?0.15:0.05;} },
                opacity: { fn: d => {return d.datum.selected.value==2?0.9:0.1;} },
                fill: { fn: d => { return d.datum.selected.value==2?'hsl('+d.datum.hue.value+','+(d.datum.saturation.value*100)+'%,'+(d.datum.luminance.value*100)+'%)':'#ddd';} }
            },
            brush :{
                consume: [
                    {
                        context: 'range-scatter',
                        data:['site_color_id'],
                        style: {
                            inactive: {
                                opacity: 0.3
                            }
                        }
                    }
                ]
            }
        };

        var tooltip_interaction ={
            type: 'native',
            events: {
                mousemove(e) {
                    const tooltip = this.chart.component('tooltip-1');
                    tooltip.emit('show', e);
                },
                mouseleave(e) {
                    const tooltip = this.chart.component('tooltip-1');
                    tooltip.emit('hide');
                }
            }
        };

        var point_tooltip = {
            key: 'tooltip-1',
            type: 'tooltip',
            settings:{
                extract: ({ node, resources }) => {
                    return({
                        site_color_id: node.data.label,
                        saturation: node.data.saturation.label,
                        hue: node.data.hue.label
                    })},
               content: ({ h, data }) => data.map(datum => {console.log('datum',datum);return h('div', {}, `${datum.site_color_id} - Hue: ${datum.hue} - Saturation: ${datum.saturation}`)})
            }
        };
        
        var range_interaction= {
            type: 'native',
            events: {
                mousedown: function(e) {

                  self.displayControl('');
                      // Use Alt-key + click to reset the brush
                      if (e.altKey) {
                        this.chart.brush('range-scatter').end();
                        this.chart.component('rangeY').emit('rangeClear');
                        this.chart.component('rangeX').emit('rangeClear');

                        self.displayControl('none');
                    }

                    const overComp = this.chart.componentsFromPoint({ x: e.clientX, y: e.clientY })[0];
                    rangeRef = overComp && overComp.key === 'saturation-axis' ? 'rangeY' : 'rangeX';

                      // Fetch the range component instance and trigger the start event
                      this.chart.component(rangeRef).emit('rangeStart', mouseEventToRangeEvent(e));

                },
                mousemove: function(e) {
                    this.chart.component(rangeRef).emit('rangeMove', mouseEventToRangeEvent(e));
                },
                mouseup: function(e) {
                      this.chart.component(rangeRef).emit('rangeEnd', mouseEventToRangeEvent(e));
                }
            }
        };

        var saturation_range_brush = {
            key: 'rangeY',
            type: 'brush-range',
            settings: {
                brush: 'range-scatter',
                direction: 'vertical',
                scale: 'saturation',
                target: {
                    component: 'saturation-axis'
                },
                bubbles: {
                    align: 'end'
                }
            }
        };

        var hue_range_brush = {
            key: 'rangeX', 
            type: 'brush-range',
            settings: {
                brush: 'range-scatter',
                direction: 'horizontal',
                scale: 'hue',
                target: {
                    component: 'hue-axis'
                },
                bubbles: {
                    align: 'start'
                }
            }
        };

        var scatterChart = picasso.chart({
            element: document.querySelector('#chartcontainer2'),
            data: data,
            settings: {
                scales: {
                    hue: hue_scale,                    
                    saturation: saturation_scale,                   
                },

                interactions: [
                    tooltip_interaction,
                    range_interaction
                ],

                components: [
                    saturation_axis,
                    hue_axis,
                    hue_grid,
                    site_color_point,
                    point_tooltip,
                    saturation_text,
                    saturation_range_brush,
                    hue_range_brush                    
                ]
            }
        });

        self.$onInit = function () {

           onValidatedData()
            .then(
                r => {
                    self.qlikApp.model.Validated.bind(onValidatedDataListener);
                    self.qlikApp.model.Invalidated.bind(onInvalidateDataListener);
                }
            )
            console.log(self);
            
        }

        self.$onDestroy = function () {
            self.qlikApp.model.Validated.unbind(onValidatedDataListener);
            self.qlikApp.model.Invalidated.unbind(onInvalidateDataListener);
        }

        function onValidatedDataListener() {
            console.log('[spectrum-scatter] validate event');
            onValidatedData()
        }

        function onInvalidateDataListener() {
            console.log('[spectrum-scatter] invalidate event');
            self.loading = true;
        }

        function onValidatedData () {
            self.loading = true;
            return qTableAdapter.getModel(self.qlikApp, self.spectumScatter)
                .then(model => {
                    console.log('[spectrum-scatter] model', model);
                    self.tmpKpis = [];
                    
                    return getKpis(model,0)
                        .then(
                            (kpis) => {
                                console.log('[spectrum-scatter] lenght', kpis.lenght);
                                updateChart(kpis);
                                self.loading = false;
                            }
                        );
                });
        }

        function getKpis(model,row) {
            console.log('[spectrum-scatter] kpis call', row);

            return qTableAdapter.fromModel(
                model,
                qTableAdapter.aggregateModelData,
                row,
                1999
            ).then(
                kpis => {
                    //console.log('[spectrum-scatter] kpis', kpis);
                   
                    self.tmpKpis = self.tmpKpis.concat(kpis);
                    console.log('[spectrum-scatter] tmp lenght', self.tmpKpis.length);

                    if(self.tmpKpis.length < model.layout.qHyperCube.qSize.qcy){
                        console.log('[spectrum-scatter] new page');
                        return getKpis(model,self.tmpKpis.length)
                    }
                    else if(self.tmpKpis.length >= model.layout.qHyperCube.qSize.qcy){
                        console.log('[spectrum-scatter] done page');
                        return self.tmpKpis;
                    }
                }, 
                (err) => console.log('error getting kpis', err)
            );
        }

        function updateChart(qlikData){
            

            var tmpData = [
                ['site_color_id','hue','saturation','luminance','selected']
            ]

            qlikData.forEach(function(value,index){
                tmpData.push([value[0].value,parseFloat(value[1].value.replace(",",".")),parseFloat(value[2].value.replace(",",".")),parseFloat(value[3].value.replace(",",".")),parseInt(value[4].value)]);
            });
            
            data[0].data = tmpData

            console.log('[spectrum-scatter] chartData',data);

            scatterChart.update({
                data: data
            });

        }
    }
    
});