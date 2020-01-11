'use strict';
define([
    'mconfig/app',
    'qlik',
    //------------ services ------------//
    'mservices/index',
    //------------ directives ------------//
    'mdirectives/index',
    //------------ components ------------//
    'mcomponents/index',
    //------------ filters ------------//
    'mfilters/index'

], function(app, qlik) {

    app.controller('indexCtrl', [indexCtrl]);

    function indexCtrl() {}
});