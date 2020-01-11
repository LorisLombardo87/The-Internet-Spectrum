define([
    'mconfig/app',
    'qlik',
    'mutils/lodash'
], function(app, qlik, _ ) {

    app.component('selectionsMenu', {
        templateUrl: 'src/components/selections-menu/selections-menu.component.html',
        controller: SelectionsMenuCtrl,
    });

    function SelectionsMenuCtrl ($rootScope) {
        const self = this;

        self.qlikApp = qlik.currApp();

        const hiddenFields = [
            'weekssellout',
            'weekswos'
        ];

        function isHiddenField (field) {
            return hiddenFields.indexOf(
                field.fieldName.toLocaleLowerCase()
            ) < 0;
        }

        function makeSelectionObj(selection){
            var SelectionObj =  selection.reduce(function(tmp,field){
                tmp[field.name]=field.value;
                return tmp;
            },{});

            return SelectionObj
        }

        function compareSelections (oldo,newo){ // compare non è inglese ma siciliano...
            Object.keys(newo).reduce(function(tmp,key){
                return tmp && (newo[key]==oldo[key])
            },true);
        }

        function listener () {
            var oldSelections = makeSelectionObj(self.selections?self.selections:[]);
            
            console.log('[selections menu] new selections', self.selectionState.selections);
            self.selections = parseSelections(
                self.selectionState.selections
            );
            console.log('[selections menu] parsed selections', self.selections)
            
            var newSelections = makeSelectionObj(self.selections?self.selections:[]);
            console.log(oldSelections, newSelections);
            console.log('equal?',(_.isEqual(oldSelections, newSelections)));
            
            if(!(compareSelections(oldSelections, newSelections))){
                //resetVariable();
            }
        }

        function resetVariable(){
            self.qlikApp = qlik.currApp();
            self.qlikApp.variable.setNumValue('v_SellOutIncreasing',0);
            self.qlikApp.variable.setNumValue('v_SellOutDecreasing',0);
            self.qlikApp.variable.setNumValue('v_WOSIncreasing',0);
            self.qlikApp.variable.setNumValue('v_WOSDecreasing',0);
        }

        function parseSelections (selections) {
            return selections
                .filter(isHiddenField)
                .map(
                    s => {
                        return {
                            name: s.fieldName,
                            value: s.selectedValues
                                .map(v => v.qName)
                                .join('-')
                        }
                    }
                )
        }

        self.$onInit = function () {
            self.selectionState = self.qlikApp.selectionState();
            console.log('[selections menu] state', self.selectionState);
            self.selectionState.OnData.bind(listener);
            listener();
        }

        self.$onDestroy = function () {
            self.selectionState.OnData.unbind(listener);
        }
    }
    
});