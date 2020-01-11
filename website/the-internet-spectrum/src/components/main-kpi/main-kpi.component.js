define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {
     ;

    app.component('mainKpi', {
        templateUrl: 'src/components/main-kpi/main-kpi.component.html',
        controller: MainKpiCtrl,
        bindings: {
            bigKpi: '<',
            smallKpi: '<',
            loading: '<'
        }
    })

    function MainKpiCtrl () {
        const self = this;

        self.qlikApp = qlik.currApp();

        self.isNegative = function (strValue) {
            return strValue.indexOf('-') >= 0;
        }
    }
    
});