define([
    'mconfig/app',
    'js/qlik',
    'jquery'
], function(app, qlik, $) {
    app.service('qTableAdapter', function () {

        function _getModel(app, tableCode) {
            return new qlik.Promise(function (resolve, reject) {
                if(!app) return reject('No app provided');

                app.getObject($('<div>'), tableCode).then(
                    resolve,
                    reject 
                );
            })
        }

        function _getHypercubeData(model, qPages) {
            if (!model.getHyperCubeData) {
                return qlik.Promise.reject('Not a valid model');
            }
            return model.getHyperCubeData('/qHyperCubeDef', qPages);
        }

        function _getHeaders(model) {
            return qlik.table(model).headers
        }

        function _headersToFields (headers) {
            return headers
                .map(h => h.qFallbackTitle)
                .map(_toField)
        }

        function _toField (f) {
            var field = f
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '_')
                .replace(/__/g, '_');
            if (field[field.length - 1] === '_') {
                field = field.substring(0, field.length -1);
            }
            return field;

        }

        function _modelDataToJson (data, headers, model) {
            const fields = _headersToFields(headers);
            return data[0].qMatrix
                    .map((row) => {
                        return row.reduce((acc, curr, idx) => {
                            acc[fields[idx]] = curr.qText;
                            return acc;
                        }, {});
                    });
        }

        function _aggregateModelData (data, headers, model) {
            const fields = _headersToFields(headers);
            return data[0].qMatrix
                .map((row) => {
                    return row.map((curr, idx) => {
                        return {
                            header: headers[idx].qFallbackTitle,
                            field:  fields[idx],
                            value:  curr.qText
                        };
                    });
                });
        }

        function _getHypercubePagination(current, step) {
            return {
                qLeft: 0,
                qTop: current,
                qWidth: Math.floor(10000/step),
                qHeight: step 
            };
        }
       
        function _fromModel(model, transformData, from, step) {
            const qPages = _getHypercubePagination(from, step);
            console.log('[qTableAdapter fromModel] qPages', qPages);
            
            console.log('[qTableAdapter fromModel] model', model.id, model);

            const headers =_getHeaders(model);

            return _getHypercubeData(model, [qPages]).then(
                data => transformData(data, headers, model),
                err => console.log('[qTableAdapter getHyperCube] error', err)
            );

        }

        function _getMaxRows (model) {
            const qMaxRow = 5000;
            return Math.floor(qMaxRow / model.layout.qHyperCube.qSize.qcx);
        }

        return {
            fromModel:          _fromModel,
            getModel:           _getModel,
            headersToLabel:     _headersToFields,
            aggregateModelData: _aggregateModelData,
            modelDataToJson:    _modelDataToJson,
            getMaxRows:         _getMaxRows
        }
    })
})