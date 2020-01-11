define([
    'mconfig/app',
    'mutils/getWeekNumber',
    'mashup/index',
    'mviews/index',
    'mservices/qCapability'
], function(app, getWeekNumber) {
    /**
     * Router Config
     **/
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'envServiceProvider', moduleConfig]); //'$positionProvider',

    function moduleConfig($stateProvider, $urlRouterProvider, $locationProvider, envServiceProvider) {

        var today = new Date();
        const yearWeek = getWeekNumber(new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000)));
        console.log('yearWeek', yearWeek);

        envServiceProvider.config({
            vars: {
                development: {
                    appId: 'colors.qvf',
                    theme: '',
                    selections:[],
                    port:80
                },
                production: {
                    appId: 'aa15f473-988c-4f56-a8fe-b530470b403a',
                    theme: '',
                    selections:[],
                    port:4443
                }
            }
        });

        envServiceProvider.check();

        $stateProvider
            .state('loading', {
                name: 'LOADING',
                label: 'loading',
                url: '/loading',
                templateUrl: 'src/views/loading/loading.template.html',
                controller: 'LoadingCtrl',
                params: {
                    toState: null,
                    toParams: null
                },
                options: {}
            })
            .state('dashboard', {
                abstract: true,
                templateUrl: 'src/views/layout/dashboard/dashboard.template.html',
                controller: 'DashboardCtrl'
            })
            .state('dashboard.home', {
                name: 'Home',
                label: 'Home',
                url: '/home',
                templateUrl: 'src/views/home/home.template.html',
                controller: 'HomeCtrl',
                options: {
                    hideSidebar: false,
                    hideKpiBar: false,
                    hideFiltersBar: false
                }
            })
            .state('dashboard.spectrum', {
                name: 'SPECTRUM',
                label: 'Spectrum',
                url: '/spectrum',
                templateUrl: 'src/views/spectrum/spectrum.template.html',
                controller: 'SpectrumCtrl',
                options: {}
            })
            .state('dashboard.snapshots', {
                name: 'SNAPSHOTS',
                label: 'snapshots',
                url: '/snapshots',
                templateUrl: 'src/views/snapshots/snapshots.template.html',
                controller: 'SnapshootsCtrl',
                options: {}
            });


        $urlRouterProvider.otherwise('/loading');
        $locationProvider.hashPrefix('');
    }

    // Things to do upon angular module start
    app.run(['$transitions', '$window', 'qCapability', 'envService', runOps]);

    function runOps($transitions, $window, $qCapability, envService) {

        if ($window.location.hostname.indexOf('localhost') >= 0) {
            envService.set('development');
        } else {
            //envService.set('development');
            envService.set('production');
        }

        console.log('[APP] environment is', envService.get())

        let runFirst = true;
        // Handling external url redirect
        $transitions.onStart({}, function(transition) {
            if (transition.to().external === true) {
                $window.open(transition.to().url, '_self');
                return false;
            }
        })
        $transitions.onBefore({}, function(transition) {
            // Don't mutate the current parameters
            const paramsCopy = Object.assign({}, transition.params());
            const stateService = transition.router.stateService;
            const to = transition.to();

            if (runFirst) {
                runFirst = false;
                if (to.name !== 'loading') {
                    return stateService.target('loading', {
                        toState: to,
                        toParams: paramsCopy
                    });
                }
            }
            return true;
        });
        // Bootstrap user, bookmarks and selections
        const appId = envService.read('appId');
        $qCapability.getApp(appId, _config);
        $qCapability.getBookmarks(appId);
        $qCapability.getSelections(appId);
    }
})