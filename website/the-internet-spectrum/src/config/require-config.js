 ;

var _mashupName = '/the-internet-spectrum';
var _config = {
    host: window.location.hostname,
    prefix: '/', //window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1),
    port: window.location.hostname.indexOf('localhost')>=0?window.location.port:4443,
    isSecure: window.location.protocol === "https:",
    openWithoutData: true
};

(function() {


    var _mashupPath = '/extensions' + _mashupName + '';

    require.config({
        baseUrl: (_config.isSecure ? "https://" : "http://") + _config.host + (_config.port ? ":" + _config.port : "") + _config.prefix + "resources",
        paths: {
            mashup:      _mashupPath,
            mconfig:     _mashupPath + '/src/config',
            mdirectives: _mashupPath + '/src/directives',
            mviews:      _mashupPath + '/src/views',
            mservices:   _mashupPath + '/src/services',
            mcomponents: _mashupPath + '/src/components',
            mfilters:    _mashupPath + '/src/filters',
            mutils:      _mashupPath + '/src/utils',

            // -- LIBS -- //
            uirouter:           _mashupPath + '/node_modules/angular-ui-router/release/angular-ui-router.min',
            bootstrapJs:        _mashupPath + '/node_modules/bootstrap/dist/js/bootstrap.bundle',
            infiniteScroll:     _mashupPath + "/node_modules/ng-infinite-scroll/build/ng-infinite-scroll.min",
            angularBootstrap:   _mashupPath + '/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
            angularEnvironment: _mashupPath + '/node_modules/angular-environment/dist/angular-environment.min',
            //picasso:            _mashupPath + '/node_modules/picasso.js/dist/picasso',
            lodash:             _mashupPath + '/node_modules/lodash-amd'
        },
        shim: {
            'uirouter': {
                deps: ['angular'],
                exports: 'uirouter'
            },
        }
    });
    // Load qlik first
    require(['js/qlik'], function(qlik) {
        qlik.setOnError(console.error, console.warn);
        // after qlik is loaded, load angular and app.js, then boostrap
        require(['angular', 'mconfig/config'], function(angular) {
            angular.bootstrap(document, ['qlik-angular', 'TheInternetSpectrum']);
        })
    });
})();