define([
    'mconfig/app',
    'qlik',
], function(app, qlik) {
     ;

    app.service('qCapabilityApi', ['$q', QCapabilityApi]);

    function QCapabilityApi ($q) {
        return {
            setField:   setField,
            applyTheme: applyTheme,
            search: search
        }

        function setField (field, value) {
            let toSet = {};
            if (isNaN(value)) {
                toSet.qText = value;
            } else {
                toSet.qNum = value;
            }
            return qlik.currApp().field(field).selectValues([value], true, true);
        }

        function applyTheme (themeName) {
            return qlik.theme.apply(themeName);
        }

        /**
         * Search anything in qlik application
         * @param {string} term 
         * @param {number} numOfResults 10 max: 100
         * @param {string} itemType Field (default) | ...
         * @param {string} context Cleared (default) | LockedFieldsOnly | CurrentSelections
         */
        function search (term, numOfResults, itemType, context) {
            numOfResults = (!!numOfResults && !isNaN(numOfResults) && numOfResults > 0 && numOfResults <= 100) ? numOfResults : 10;
            itemType = !!itemType ? itemType : 'Field';
            context  = !!context ? context : 'Cleared'

            return $q((resolve, reject) => {
                if (!term || !(typeof term === 'string') || term.length < 2) {
                    reject({
                        message: 'Search term lenght too short (>= 2)'
                    });
                } else {

                    const qTerms = [term];
                    const qPage = { 
                        qOffset: 0, 
                        qCount: numOfResults
                    };
                    const qOptions = { 
                        qContext: context || 'Cleared'
                    }

                    qlik.currApp().searchResults( 
                        qTerms, qPage, qOptions,
                        function (reply) {
                            console.log('search result', reply);
                            console.timeEnd('search');
                            if (reply.qResult.qTotalNumberOfGroups > 0) {
                                const result = reply.qResult.qSearchGroupArray
                                    .flatMap(
                                        t => t.qItems
                                            .filter(
                                                item => item.qItemType === itemType
                                            )
                                            .flatMap(
                                                item => item.qItemMatches.map(
                                                    _match => {
                                                        return {
                                                            field: item.qIdentifier,
                                                            value: _match.qText
                                                        }
                                                    }
                                                )
                                            ) 
                                    )
                                resolve(result);
                            } else {
                                resolve([]);
                            }
                        }
                    )
                }
            });
        }
    }
    
});