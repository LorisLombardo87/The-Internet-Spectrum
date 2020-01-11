define([
    'mconfig/app',
    'qlik',
    'mutils/getWeekNumber',
],  function(app, qlik, getWeekNumber) {

    app.controller('DashboardCtrl', ['$scope', '$state', 'qCapability', '$transitions', DashboardCtrl]);

    function DashboardCtrl($scope, $state, $qCapability, $transitions) {

        $scope.qlikApp = qlik.currApp();

        $scope.global = $qCapability.getGlobal(_config);

        $scope.currentState = $state.current;

        $scope.sidebarOpen = false;

        $scope.filterPaneOpen = false;

        $scope.loading = false;

        $scope.sitefilter = 'hdaNtU';
        $scope.domainfilter = 'kjA';
        $scope.rankfilter = 'PzSxM';
        $scope.coloridfilter = 'dLpgtA';

        /* $qCapability.getCurrentUser(_qsAppId).then(function(_user) {
            $scope.ntname = _user
        }); */

        $scope.toggleSidebar = function() {
            $scope.sidebarOpen = !$scope.sidebarOpen;
        }

        $scope.toggleFilterPane = function() {
            $scope.filterPaneOpen = !$scope.filterPaneOpen;
        }

        $transitions.onSuccess({}, function(transition) {
            const destination = transition.to();
            console.log('[app routes] destination', destination);
            $scope.currentState = destination;
        });

        $scope.qlikApp.model.Validated.bind(onValidatedData);
        $scope.qlikApp.model.Invalidated.bind(onInvalidateData);

        function onValidatedData(){
            console.log('[qlik.currApp] valid');
            $scope.loading = false;
        };
        function onInvalidateData(){
            console.log('[qlik.currApp] invalid');
            $scope.loading = true;
        };


    }
});