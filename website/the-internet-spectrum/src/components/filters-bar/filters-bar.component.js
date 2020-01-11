define([
    'mconfig/app',
    'qlik'
], function(app, qlik) {
     ;

    app.component('filtersBar', {
        templateUrl: 'src/components/filters-bar/filters-bar.component.html',
        controller: FiltersBarCtrl,
        bindings: {}
    });

    function FiltersBarCtrl () {
        const self = this;

        self.qlikApp = qlik.currApp();

        self.filters = {
            top5Region:     'NdARzgQ',
            top5Account:    'rfZpJY',
            lastWeek:       'VCdGK',
            qty:            'SNMNw',
            amount:         'jFJLq',
            weekly:         'waxjHP',
            monthly:        'ZqAfKz',
            quarterly:      'Rjfhy',
            yearly:         'CLNEJT'
        }
    }
});