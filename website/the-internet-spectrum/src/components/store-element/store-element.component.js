define([
    'mconfig/app',
    'jquery',
    'qlik'
], function(app, $, qlik) {
    app.component('storeElement', {
        templateUrl: 'src/components/store-element/store-element.component.html',
        controller: StoreElementController,
        bindings: {
            store: '<'
        }
    });

    function StoreElementController() {
        const self = this;

        self.currApp = qlik.currApp();

        self.$onInit = function() {
            /* console.log('store element init', self.store); */
        }

        self.getCustomerGroupBg = function(customerGroup) {
            switch (customerGroup.toLowerCase()) {
                case 'euronics':
                    return 'src/img/euronics@2x.png';
                case 'mediaworld':
                    return 'src/img/mediaworld@2x.png';
                case 'expert':
                    return 'src/img/expert@2x.png';
                case 'unieuro':
                    return 'src/img/unieuro@2x.png';
                case 'gre':
                    return 'src/img/trony.jpg';
                default:
                    return 'src/img/logos/logo_samsung.png';
            }
        }

        self.isPositive = function(field) {
            return field.indexOf('-') < 0;
        }

        self.applyStoreFilter = function(shipTo) {
            //TODO: add division field
            self.currApp.field("ShipTo Name").selectValues([{ qText: shipTo.value }], true, true);
            console.log('[store element] apply store field', shipTo, "shipToName", shipTo.value);
        }


    }
});