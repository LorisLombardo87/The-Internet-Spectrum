define([
    'mconfig/app',
    'qlik',
], function (app, qlik) {
    app.component('keyPeopleBar', {
        templateUrl: 'src/components/key-people-bar/key-people-bar.component.html',
        controller: KeyPeopleBarCtrl,
        bindings: {}
    });

    function KeyPeopleBarCtrl (qTableAdapter) {
        const self = this;

        self.loading = true;

        self.table = "mFmQPF";

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
            console.log('[key people bar] validate event');
            onValidatedData();
        }

        function onInvalidateDataListener() {
            console.log('[key people bar] invalidate event');
            self.loading = true;
        }

        function onValidatedData () {
            self.loading = true;
            return qTableAdapter.getModel(self.qlikApp, self.table)
                .then(model => {
                    console.log('[key people bar] model', model);
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
                2
            ).then(
                kpis => {
                    console.log('[key people bar] kpis', kpis);
                    self.kpis = kpis[0];
                    return self.kpis;
                }, 
                (err) => console.log('error getting kpis', err)
            );
        }

    }
});