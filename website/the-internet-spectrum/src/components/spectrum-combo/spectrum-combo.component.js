
define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {

    app.component('spectrumCombo', {
        templateUrl: 'src/components/spectrum-combo/spectrum-combo.component.html',
        controller: BigKpiCtrl,
        bindings: {}
    })

    function BigKpiCtrl (qTableAdapter) {

        const self = this;

        self.loading = true;

        self.spectumCombo = "RLyRUL";

        self.qlikApp = qlik.currApp();

        var data = [{
            type: 'matrix',
            data: [
              ['hue_class','hue','total','selected']
            ]
          }];

const colors = {
    total: '#060',
    selected: '#5a5a5a'
  };


        var comboChart = picasso.chart({
            element: document.querySelector('#chartcontainer1'),
            data: data,
            settings: {
                scales: {

                    total: {
                        data: {
                            field: 'total',

                        },
                        invert: true,
                        expand:0.1
                    },
                    
                    selected: {
                        data: {
                            field: 'selected',

                        },
                        invert: true,
                        expand:0.1
                    },

                    hue: {
                        data: { 
                            extract: { field: 'hue_class' }
                        } 
                    },

                    // color: {
                    //     data: {
                    //         extract: { field: 'hue_class' }
                    //     },
                    //     explicit: { // override default colors
                    //         domain: colors.map(d => {console.log('d',d);d.domain}),
                    //         range: colors.map(d => {d.color}),
                    //     },
                    //     type: 'color'
                    //   }

                      
                    // color: { 
                    //     // data: { 
                    //     //     extract: { field: 'hue_class' } 
                    //     // },

                    //     type: 'sequential-color',
                    //     min: 0,
                    //     max: 360,

                    //     range: ['hsl(0,50%,50%)','hsl(5,50%,50%)','hsl(10,50%,50%)','hsl(15,50%,50%)','hsl(20,50%,50%)','hsl(25,50%,50%)','hsl(30,50%,50%)','hsl(35,50%,50%)','hsl(40,50%,50%)','hsl(45,50%,50%)','hsl(50,50%,50%)','hsl(55,50%,50%)','hsl(60,50%,50%)','hsl(65,50%,50%)','hsl(70,50%,50%)','hsl(75,50%,50%)','hsl(80,50%,50%)','hsl(85,50%,50%)','hsl(90,50%,50%)','hsl(95,50%,50%)','hsl(100,50%,50%)','hsl(105,50%,50%)','hsl(110,50%,50%)','hsl(115,50%,50%)','hsl(120,50%,50%)','hsl(125,50%,50%)','hsl(130,50%,50%)','hsl(135,50%,50%)','hsl(140,50%,50%)','hsl(145,50%,50%)','hsl(150,50%,50%)','hsl(155,50%,50%)','hsl(160,50%,50%)','hsl(165,50%,50%)','hsl(170,50%,50%)','hsl(175,50%,50%)','hsl(180,50%,50%)','hsl(185,50%,50%)','hsl(190,50%,50%)','hsl(195,50%,50%)','hsl(200,50%,50%)','hsl(205,50%,50%)','hsl(210,50%,50%)','hsl(215,50%,50%)','hsl(220,50%,50%)','hsl(225,50%,50%)','hsl(230,50%,50%)','hsl(235,50%,50%)','hsl(240,50%,50%)','hsl(245,50%,50%)','hsl(250,50%,50%)','hsl(255,50%,50%)','hsl(260,50%,50%)','hsl(265,50%,50%)','hsl(270,50%,50%)','hsl(275,50%,50%)','hsl(280,50%,50%)','hsl(285,50%,50%)','hsl(290,50%,50%)','hsl(295,50%,50%)','hsl(300,50%,50%)','hsl(305,50%,50%)','hsl(310,50%,50%)','hsl(315,50%,50%)','hsl(320,50%,50%)','hsl(325,50%,50%)','hsl(330,50%,50%)','hsl(335,50%,50%)','hsl(340,50%,50%)','hsl(345,50%,50%)','hsl(350,50%,50%)','hsl(355,50%,50%)'],
                                              
                    // }      
                    
                    // color: { 
                    //     data: { 
                    //         extract: { field: 'hue_class' } 
                    //     },

                    //     type: 'categorical-color',

                    //     //range: ['hsl(0,50%,50%)','hsl(5,50%,50%)','hsl(10,50%,50%)','hsl(15,50%,50%)','hsl(20,50%,50%)','hsl(25,50%,50%)','hsl(30,50%,50%)','hsl(35,50%,50%)','hsl(40,50%,50%)','hsl(45,50%,50%)','hsl(50,50%,50%)','hsl(55,50%,50%)','hsl(60,50%,50%)','hsl(65,50%,50%)','hsl(70,50%,50%)','hsl(75,50%,50%)','hsl(80,50%,50%)','hsl(85,50%,50%)','hsl(90,50%,50%)','hsl(95,50%,50%)','hsl(100,50%,50%)','hsl(105,50%,50%)','hsl(110,50%,50%)','hsl(115,50%,50%)','hsl(120,50%,50%)','hsl(125,50%,50%)','hsl(130,50%,50%)','hsl(135,50%,50%)','hsl(140,50%,50%)','hsl(145,50%,50%)','hsl(150,50%,50%)','hsl(155,50%,50%)','hsl(160,50%,50%)','hsl(165,50%,50%)','hsl(170,50%,50%)','hsl(175,50%,50%)','hsl(180,50%,50%)','hsl(185,50%,50%)','hsl(190,50%,50%)','hsl(195,50%,50%)','hsl(200,50%,50%)','hsl(205,50%,50%)','hsl(210,50%,50%)','hsl(215,50%,50%)','hsl(220,50%,50%)','hsl(225,50%,50%)','hsl(230,50%,50%)','hsl(235,50%,50%)','hsl(240,50%,50%)','hsl(245,50%,50%)','hsl(250,50%,50%)','hsl(255,50%,50%)','hsl(260,50%,50%)','hsl(265,50%,50%)','hsl(270,50%,50%)','hsl(275,50%,50%)','hsl(280,50%,50%)','hsl(285,50%,50%)','hsl(290,50%,50%)','hsl(295,50%,50%)','hsl(300,50%,50%)','hsl(305,50%,50%)','hsl(310,50%,50%)','hsl(315,50%,50%)','hsl(320,50%,50%)','hsl(325,50%,50%)','hsl(330,50%,50%)','hsl(335,50%,50%)','hsl(340,50%,50%)','hsl(345,50%,50%)','hsl(350,50%,50%)','hsl(355,50%,50%)'],
                        

                    //     explicit: {  // Optional
                    //         domain: ['0','5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100','105','110','115','120','125','130','135','140','145','150','155','160','165','170','175','180','185','190','195','200','205','210','215','220','225','230','235','240','245','250','255','260','265','270','275','280','285','290','295','300','305','310','315','320','325','330','335','340','345','350','355'],
                    //         range: ['hsl(0,50%,50%)','hsl(5,50%,50%)','hsl(10,50%,50%)','hsl(15,50%,50%)','hsl(20,50%,50%)','hsl(25,50%,50%)','hsl(30,50%,50%)','hsl(35,50%,50%)','hsl(40,50%,50%)','hsl(45,50%,50%)','hsl(50,50%,50%)','hsl(55,50%,50%)','hsl(60,50%,50%)','hsl(65,50%,50%)','hsl(70,50%,50%)','hsl(75,50%,50%)','hsl(80,50%,50%)','hsl(85,50%,50%)','hsl(90,50%,50%)','hsl(95,50%,50%)','hsl(100,50%,50%)','hsl(105,50%,50%)','hsl(110,50%,50%)','hsl(115,50%,50%)','hsl(120,50%,50%)','hsl(125,50%,50%)','hsl(130,50%,50%)','hsl(135,50%,50%)','hsl(140,50%,50%)','hsl(145,50%,50%)','hsl(150,50%,50%)','hsl(155,50%,50%)','hsl(160,50%,50%)','hsl(165,50%,50%)','hsl(170,50%,50%)','hsl(175,50%,50%)','hsl(180,50%,50%)','hsl(185,50%,50%)','hsl(190,50%,50%)','hsl(195,50%,50%)','hsl(200,50%,50%)','hsl(205,50%,50%)','hsl(210,50%,50%)','hsl(215,50%,50%)','hsl(220,50%,50%)','hsl(225,50%,50%)','hsl(230,50%,50%)','hsl(235,50%,50%)','hsl(240,50%,50%)','hsl(245,50%,50%)','hsl(250,50%,50%)','hsl(255,50%,50%)','hsl(260,50%,50%)','hsl(265,50%,50%)','hsl(270,50%,50%)','hsl(275,50%,50%)','hsl(280,50%,50%)','hsl(285,50%,50%)','hsl(290,50%,50%)','hsl(295,50%,50%)','hsl(300,50%,50%)','hsl(305,50%,50%)','hsl(310,50%,50%)','hsl(315,50%,50%)','hsl(320,50%,50%)','hsl(325,50%,50%)','hsl(330,50%,50%)','hsl(335,50%,50%)','hsl(340,50%,50%)','hsl(345,50%,50%)','hsl(350,50%,50%)','hsl(355,50%,50%)'],
                    //     },                         
                    // }                        
                },

                interactions: [{
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
                }],

                components: [

                    {
                        type: 'axis',
                        dock: 'left',
                        scale: 'total',
                        formatter: {
                          type: 'd3-number',
                          format: ",.2r"
                        },
                        settings: {
                          labels: {

                          }
                        },
                      },

                    {
                        type: 'axis',
                        dock: 'right',
                        scale: 'selected',
                        settings: {
                          labels: {
                                show:false,
                                margin:0
                          },
                          ticks: { 
                            /* Toggle ticks on/off */
                            show: false, // Optional
                            /* Space in pixels between the ticks and the line. */
                            margin: 0, // Optional
                           
                          },
                          line: { 
                            /* Toggle line on/off */
                            show: false, // Optional
                          },
                          /* Padding in direction perpendicular to the axis */
                          paddingStart: 0, // Optional
                          /* Padding in direction perpendicular to the axis */
                          paddingEnd: 0, // Optional
                        },
                        formatter: {
                          type: 'd3-number',
                          format: ",.2r"
                        }
                    }, 

                    {
                        type: 'axis',
                        dock: 'bottom',
                        scale: 'hue',
                        formatter: {
                          type: 'd3-number',
                          format: ",.2r"
                        },
                        settings:{
                            labels:
                            {
                                show:false
                            }
                        }
                      },

                    // {
                    //   key: 'total',
                    //   type: 'line',
                    //   data: {
                    //     extract: {
                    //       field: 'hue_class',
                    //       props: {
                    //         v: { field: 'total' },
                    //         hue:{ field: 'hue' }
                    //       }
                    //     }
                    //   },
                    //   settings: {
                    //     coordinates: {
                    //       major: { scale: 'hue' },
                    //       minor: { scale: 'total', ref: 'v' }
                    //     },
                    //     layers: {
                    //         curve: 'monotone',
                    //         show: true,
                    //         line: {
                    //             strokeWidth: 2,
                    //             stroke: { scale: 'color', ref: 'hue' },
                    //         },
                    //         area: {
                    //             fill: { 
                    //                 fn: d => {
                    //                    console.log('fill', d.datum);
                    //                    c = 'hsl('+d.datum.hue.value+',80%,50%)';
                    //                    return c;
                                       
                    //                 }
                    //             },
                    //             opacity: 0.9
                    //         }
                    //     }
                    //   }
                    // },

                    {
                      key: 'bars',
                      type: 'box',
                      data: {
                        extract: {
                          field: 'hue_class',
                          props: {
                            start: 0,
                            end: { field: 'total' },
                            total: { field: 'total' },
                            selected: { field: 'selected' },
                            hue:{ field: 'hue' }
                          }
                        }
                      },
                      settings: {
                         major: { scale: 'hue' },
                         minor: { scale: 'total', },
                        box: {
                            fill: { 
                                fn: d => {
                                   c = 'hsl('+d.datum.hue.value+',50%,50%)';
                                   return c;
                                   
                                }
                            }
                        }
                      }
                    },

                    {
                      key: 'selected',
                      type: 'line',
                      data: {
                        extract: {
                          field: 'hue_class',
                          props: {
                            v: { field: 'selected' }
                          }
                        }
                      },
                      settings: {
                        coordinates: {
                          major: { scale: 'hue' },
                          minor: { scale: 'selected', ref: 'v' }
                        },
                        layers: {
                            curve: 'monotone',
                            show: true,
                          line: {
                            strokeWidth: 1,
                            stroke: colors.selected,
                          }
                        }
                      }
                    }
                    ,

                    {
                      key: 'p',
                      type: 'point',
                      data: {
                        extract: {
                          field: 'hue_class',
                          props: {
                            selected: { field: 'selected' },
                            hue: { field: 'hue' },
                            total: { field: 'total' },
                          }
                        }
                      },
                      settings: {
                        x: { scale: 'hue' },
                        y: { scale: 'selected', ref:'selected' },
                        shape: 'circle',
                        size: 0.25,
                        strokeWidth: 1.5,
                        stroke: colors.selected,
                        opacity: 0.9,
                        fill: { 
                                fn: d => {
                                   c = 'hsl('+d.datum.hue.value+',80%,70%)';
                                   return c;
                                   
                                }
                            }
                      }
                    }
                    ,

                    {
                        key: 'tooltip-1',
                        type: 'tooltip',
                        settings:{
                            extract: ({ node, resources }) => {
                                console.log('node',node);
                                return({
                                    hue: node.data.label,
                                    selected: node.data.selected.label,
                                    total: node.data.total.label
                                })},
                                // We go from a basic content generator, to one that understand our new data structure
                            content: ({ h, data }) => data.map(datum => {console.log('datum',datum);return h('div', {}, `${datum.hue} - Total Samples: ${datum.total} - Selected: ${datum.selected}`)})
                        }
                    },
                    ,
                    {
                      type: 'text',
                      text: '# of Samples',
                      dock: 'left'
                    }
                ]
            }
        })

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
            console.log('[spectrum-combo] validate event');
            onValidatedData()
        }

        function onInvalidateDataListener() {
            console.log('[spectrum-combo] invalidate event');
            self.loading = true;
        }

        function onValidatedData () {
            self.loading = true;
            return qTableAdapter.getModel(self.qlikApp, self.spectumCombo)
                .then(model => {
                    console.log('[spectrum-combo] model', model);
                    return getKpis(model)
                        .then(
                            () => {
                                self.loading = false;
                            }
                        )
                });
        }

        function getKpis(model) {
            return qTableAdapter.fromModel(
                model,
                qTableAdapter.aggregateModelData,
                0,
                2000
            ).then(
                kpis => {
                    console.log('[spectrum-combo] kpis', kpis);
                    //self.map = kpis;
                    updateChart(kpis);
                    return self.kpis;
                }, 
                (err) => console.log('error getting kpis', err)
            );
        }

        function updateChart(qlikData){
            

            var tmpData = [
                ['hue_class','hue','total','selected']
            ]

            qlikData.forEach(function(value,index){
                tmpData.push([value[0].value,parseInt(value[3].value),parseInt(value[1].value),parseInt(value[2].value)]);
            });
            
            data[0].data = tmpData

            console.log('chartData',data);

            comboChart.update({
                data: data
            });

        }
    }
    
});