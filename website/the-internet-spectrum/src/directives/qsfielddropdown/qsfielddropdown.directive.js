define(['angular', 'mconfig/app'], function (angular, app) {

    app.directive("qsFieldDropdown", function () {
        return {
            restrict: "E",
            templateUrl: './src/directives/qsfielddropdown/qsfielddropdown.template.html',
            scope: {
                appName: '@',
                fieldName: '@',
                labelName: '@',
                iconClass: '=',
                invertedIconPos: '=',
                invertedBadgePos: '=',
                ddMaxHeight: '=?',
            },
            controller: 'qsfielddropdownCtrl'
        }
    })
    app.controller("qsfielddropdownCtrl", ['qCapability', '$scope', '$document', '$element', function (qCapability, $scope, $document, $element) {
        var qApp = qCapability.getApp($scope.appName);
        var _fieldData = qApp.field($scope.fieldName).getData();
        //console.log('$scope.appName', $scope.appName);

        //var _fieldData = $scope.appName.field($scope.fieldName).getData();


        var _alternativeValues = [],
            _firstLoad = true;
        $scope.multipleSelection = {
            status: false,
            value: 0
        };
        _fieldData.OnData.bind(function () {
            $scope.fieldValues = [];
            $scope.selection = $scope.labelName;
            angular.forEach(_fieldData.rows, function (row, idx) {
                if (_firstLoad && row.qState === 'O')
                    _alternativeValues.push(row.qText);
                /** Show the value if just one is selected or selectable */
                if (_fieldData.stateCounts.qSelected === 1 && row.qState === "S")
                    $scope.selection = row.qText;
                else if (_fieldData.stateCounts.qSelected === 0 && _fieldData.stateCounts.qOption === 1 && row.qState === "O")
                    $scope.selection = row.qText;
                /** set counter for multiple selection */
                $scope.multipleSelection.status = _fieldData.stateCounts.qSelected > 1 ? true : false;
                $scope.multipleSelection.value = _fieldData.stateCounts.qSelected;
                /** build the array status: one entry for every value of the field */
                $scope.fieldValues.push({
                    id: idx,
                    data: row.qText,
                    selected: row.qState === 'S' ? true : false,
                    alternative: _alternativeValues.indexOf(row.qText) !== -1 && (row.qState !== 'O' && row.qState !== 'S') ? true : false,
                    disabled: _alternativeValues.indexOf(row.qText) === -1 && row.qState === 'X' ? true : false
                });
            })
            _firstLoad = false;
        })
        //$scope.ddMaxHeight = $scope.ddMaxHeight ? $scope.ddMaxHeight + 'px' : 'auto';
        $scope.ddMaxHeight = $scope.ddMaxHeight ? $scope.ddMaxHeight : 'auto';
        $scope.expanded = false;
        $scope._top = 0;
        $scope._left = 0;


        $scope.toggle = function ($event) {
            $scope.expanded = !$scope.expanded;
        }




        $scope.selectValue = function () {
            qApp.field($scope.fieldName).clear();
            qApp.field($scope.fieldName).toggleSelect(this.value.data, !this.value.selected);
            $scope.expanded = false;
            //$scope.appName.field($scope.fieldName).toggleSelect(this.value.data, !this.value.selected);
        }

        function closeDropdown(event) {
            // Am i clicked?
            var isClicked = $element.find(event.target).length > 0;
            if (!isClicked) {
                $scope.expanded = false;
                $scope.$apply();
            }
        }
        $document.on('click', closeDropdown)
        $scope.$on('$destroy', function () {
            $document.off('click', closeDropdown);
        });
    }])
});
