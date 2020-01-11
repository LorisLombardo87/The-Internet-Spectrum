define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {
     ;

    app.component('keyPeople', {
        templateUrl: 'src/components/key-people/key-people.component.html',
        controller: KeyPeopleCtrl,
        bindings: {
            bigKpi: '<',
            smallKpi: '<',
            loading: '<'
        }
    })

    function KeyPeopleCtrl () {
        const self = this;

        self.qlikApp = qlik.currApp();

        self.isNegative = function (strValue) {
            return strValue.indexOf('-') >= 0;
        }
    }
    
});