define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {
     ;

    app.component('colorsMap', {
        templateUrl: 'src/components/colors-map/colors-map.component.html',
        controller: BigKpiCtrl,
        bindings: {}
    })

    function BigKpiCtrl (qTableAdapter) {
        const self = this;

        self.loading = true;

        self.table = "eWaCuJM";

        self.qlikApp = qlik.currApp();

        self.$onInit = function () {

           onValidatedData()
            .then(
                r => {
                    self.qlikApp.model.Validated.bind(onValidatedDataListener);
                    self.qlikApp.model.Invalidated.bind(onInvalidateDataListener);
                }
            )
        }

        self.$onDestroy = function () {
            self.qlikApp.model.Validated.unbind(onValidatedDataListener);
            self.qlikApp.model.Invalidated.unbind(onInvalidateDataListener);
        }

        function onValidatedDataListener() {
            console.log('[colors map] validate event');
            onValidatedData();
        }

        function onInvalidateDataListener() {
            console.log('[colors map] invalidate event');
            self.loading = true;
        }

        function onValidatedData () {
            self.loading = true;
            return qTableAdapter.getModel(self.qlikApp, self.table)
                .then(model => {
                    console.log('[colors map] model', model);
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
                4000
            ).then(
                kpis => {
                    console.log('[colors map] kpis', kpis);
                    self.map = kpis;
                    return self.kpis;
                }, 
                (err) => console.log('error getting kpis', err)
            );
        }
    }
    
});