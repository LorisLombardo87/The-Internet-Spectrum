define([
    'mconfig/app',
    'qlik'
], function(app, qlik) {

    app.component('selectionItem', {
        templateUrl: 'src/components/selection-item/selection-item.component.html',
        controller: SelectionItemCtrl,
        bindings: {
            selection: '<'
        }
    });

    function SelectionItemCtrl () {
        var self = this;

        self.currApp = qlik.currApp();

        self.removeSelection = function (selection) {
            self.currApp.field(selection.name).clear();
            console.log('[selection item] remove selection', selection);
        }
    }
    
});