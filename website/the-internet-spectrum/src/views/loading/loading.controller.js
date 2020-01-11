define([
    'mconfig/app',
    'qlik',
], function (app, qlik) {
     ;

    app.controller('LoadingCtrl', ['$scope', '$state', '$timeout', 'qCapabilityApi', '$q', '$stateParams', 'envService', LoadingCtrl]);

    function LoadingCtrl($scope, $state, $timeout, qCapabilityApi, $q, $stateParams, envService) {
        $scope.qlikApp = qlik.currApp();

        $scope.selectionObjectId = null;

        const themeName  = envService.read('theme');
        const selections = envService.read('selections');

        console.log('[Loading] selections to do', selections);

        const toState  = !!$stateParams.toState ? $stateParams.toState : 'dashboard.home';
        const toParams = $stateParams.toParams

        console.log('[Loading] to state', toState, 'to params', toParams);

        const resolveBeforeStartup = selections.map(
            s =>
                qCapabilityApi.setField(s.field, s.value)
                .then(
                    res => {
                        console.log('[Loading] ', s.field, '=', s.value, 'done');
                        return res;
                    },
                    err => {
                        console.log('[Loading] selection error', s.field, '->', s.value, ':', err);
                        return err;
                    }
                )
            
        ).concat(
            qCapabilityApi.applyTheme(themeName)
            .then(
                res => console.log('[Loading] result apply theme ', themeName, res),
                err => console.log('[Loading] error apply theme ', themeName, err)
            )
        )

        $q.all(resolveBeforeStartup)
        .then(
            (res) => {
                console.log('[Loading] all selections have been set', res);
                $timeout(() => {
                    $state.go(toState, toParams);
                }, 300);
            },
            (err) => console.log('[Loading] error setting value', err)
        )

    }

});