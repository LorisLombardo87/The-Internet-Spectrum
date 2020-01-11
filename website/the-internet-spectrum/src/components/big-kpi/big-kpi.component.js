define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {
     ;

    app.component('bigKpi', {
        templateUrl: 'src/components/big-kpi/big-kpi.component.html',
        controller: BigKpiCtrl,
        bindings: {
            bigKpi: '<',
            smallKpi: '<',
            loading: '<'
        }
    })

    function BigKpiCtrl () {
        const self = this;

        self.qlikApp = qlik.currApp();

        self.isNegative = function (strValue) {
            return strValue.indexOf('-') >= 0;
        }
    }
    
});