define([
    'mconfig/app',
    'qlik'
], function(app, qlik) {
     ;
    
    app.component('sectorButtons', {
        templateUrl: 'src/components/sector-buttons/sector-buttons.component.html',
        controller: SectorButtonsCtrl,
        bindings: {
            one:   '<',
            two:   '<',
            three: '<',
            four:  '<',
            clear: '<'
        }
    });

    function SectorButtonsCtrl () {
        const self = this;

        self.qlikApp = qlik.currApp();
    }
});