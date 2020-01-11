define([
    'mconfig/app',
    'qlik'
], function(app, qlik) {
     ;

    app.component('storeSidebar', {
        templateUrl: 'src/components/store-sidebar/store-sidebar.component.html',
        controller: StoreSidebarController
    });

    function StoreSidebarController(qTableAdapter, qCapabilityApi, $q) {
        var self = this;

        self.table = "qAkLEh";
        self.orderFieldId = 'WbPyk';

        self.qlikApp = qlik.currApp();

        self.totalItems = 0;
        self.currentPage = 1;

        self.valid = false;

        /* self.setPage = function (pageNo) {
            self.currentPage = pageNo;
        }; */
        
        self.$onInit = function() {
            console.log('[store sidebar] init');
            onValidatedData()
                .then(
                    () => {
                        self.qlikApp.model.Validated.bind(onValidatedData);
                        self.qlikApp.model.Invalidated.bind(onInvalidateData);
                    }
                )
            /* self.qlikApp.model.Validated.bind(onValidatedData);
            self.qlikApp.model.Invalidated.bind(onInvalidateData); */
        }

        self.$onDestroy = function() {
            console.log('[store sidebar] destroy');
            self.qlikApp.model.Validated.unbind(onValidatedData);
            self.qlikApp.model.Invalidated.unbind(onInvalidateData);
        }

        self.search = function(item) {
            if (!!self.query && self.query.length > 2) {
                const field = item[12].value.toLocaleLowerCase();
                const term  = self.query.toLocaleLowerCase();
                return field.indexOf(term) >= 0;
            }
            return true;
        }

        self.qlikSearch = function () {
            if (!!self.query && self.query.length > 2) {
                const term  = self.query.toLocaleLowerCase();
                console.log('[store sidebar] searching ', term);
                console.time('search');
                qCapabilityApi.search(term, 15).then(
                    res => {
                        console.log('[store sidebar] search result', res)
                        console.timeEnd('search');
                        self.searchResults = res;
                    },
                    err => console.log('[store sidebar] search error', err)
                )
            }
        }

        self.selectTerm = function (item) {
            console.log('[store sidebar] search for', item);
            self.qlikApp.field(item.field).selectValues([{ qText: item.value }], true, true);
            self.resultfocus = false;
        }

        function onValidatedData () {
            if (!self.valid) {
                return $q.when(
                    qTableAdapter.getModel(self.qlikApp, self.table)
                    .then(
                        (model) => {

                            console.log('[store sidebar] model', model);
                            self.model = model;
                            self.valid = true;
                            return getStores(self.model);
                        },
                        (err) => console.log('[store sidebar] error getting model', err)
                    )
                )
            } else {
                return $q.when(false);
            }
        }

        function onInvalidateData () {
            self.valid = false;
            console.log('[store sidebar] invalidate event');
        }

        function getStores(model) {

            self.totalItems = qTableAdapter.getMaxRows(model);

            return qTableAdapter.fromModel(
                model,
                qTableAdapter.aggregateModelData,
                0,
                self.totalItems
            ).then(
                stores => {
                    console.log('[store sidebar] stores', stores);
                    self.stores = stores;
                    return self.stores;
                },
                (err) => console.log('[store sidebar] error getting stores', err)
            );
        }


    }
});