define([
    'mconfig/app',
], function(app) {
     ;
    app.directive('loadingSpinner', function($document) {
        return {
            restrict: 'EA',
            template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
            link: function(scope, element, attrs) {}
        };
    });
});