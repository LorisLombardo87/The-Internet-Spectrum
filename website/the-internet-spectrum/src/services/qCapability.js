define([
    'angular',
    'mconfig/app',
    'js/qlik'], function(angular,app,qlik){

    app.service('qCapability', ['$q', '$rootScope', qCapability]);

    function qCapability($q, $rootScope) {
        var _qApps = {};
        this.getApp = function (appName, config) {
            if (_qApps[appName] === undefined) {
                _qApps[appName] = { instance: qlik.openApp(appName, config), selectionStatus: { cardinality: 0, fields: {} }, bookmarks: [] };
                console.log('Opening app: ' + appName);
            }
            return _qApps[appName].instance;
        };
        this.getGlobal = function (config) {
            return qlik.getGlobal(config);
        }
        this.getCurrentUser = function (appName) {
            var _userdefer = $q.defer();
            var _ntuser;
            _qApps[appName].instance.global.getAuthenticatedUser(function (reply) {
                _ntuser = reply.qReturn.split("; ");
                if (_ntuser.length > 1)
                    _ntuser = _ntuser[1].split("=")[1] // QS Enterprise
                else
                    _ntuser = _ntuser[0];	// QS Dekstop
                console.log(_ntuser);
                _userdefer.resolve(_ntuser);
            });
            return _userdefer.promise;
        }
        this.getBookmarks = function (appName) {
            var _qsObjId;
            _qApps[appName].instance.getList("BookmarkList", function (reply) {
                _qApps[appName].bookmarks = [];
                angular.forEach(reply.qBookmarkList.qItems, function (bookmark) {
                    _qApps[appName].bookmarks.push(bookmark);
                });
                $rootScope.$broadcast('bookmarksChange', _qApps[appName].bookmarks);
            }).then(function (model) {
                _qsObjId = model.layout.qInfo.qId;
            });
            return _qsObjId;
        }
        this.getSelections = function (appName) {
            return _qApps[appName].instance.getList("SelectionObject", function (reply) {
                // Data is no longer updated
                angular.forEach(_qApps[appName].selectionStatus.fields, function (data) {
                    data.updated = false;
                });
                // Add/Refresh data
                angular.forEach(reply.qSelectionObject.qSelections, function (fieldStatus) {
                    _qApps[appName].selectionStatus.fields[fieldStatus.qReadableName || fieldStatus.qField] = _qApps[appName].selectionStatus.fields[fieldStatus.qReadableName || fieldStatus.qField] || {};
                    _qApps[appName].selectionStatus.fields[fieldStatus.qReadableName || fieldStatus.qField].values = fieldStatus.qSelected;
                    _qApps[appName].selectionStatus.fields[fieldStatus.qReadableName || fieldStatus.qField].locked = fieldStatus.qLocked;
                    _qApps[appName].selectionStatus.fields[fieldStatus.qReadableName || fieldStatus.qField].updated = true;
                });
                // Removed data that has not been refreshed
                angular.forEach(_qApps[appName].selectionStatus.fields, function (data, key) {
                    if (data.updated === false)
                        delete _qApps[appName].selectionStatus.fields[key];
                });
                _qApps[appName].selectionStatus.cardinality = Object.keys(_qApps[appName].selectionStatus.fields).length;
                // Emit Event
                $rootScope.$broadcast('selectionChange', _qApps[appName].selectionStatus);
            }).then(function (model) {
                return {
                    qsObjId:  model.layout.qInfo.qId,
                    model:    model
                }
            });
        }


        this.setTheme =  function (themeId) {
            console.log('theme', themeId);
            qlik.theme.apply(themeId).then(function(result){
            });
        }


        this.clearSelections = function (appName, removeLock) {
            if (_qApps[appName].selectionStatus.cardinality > 0) {
                // Unlock locked fields
                if (removeLock) {
                    angular.forEach(_qApps[appName].selectionStatus.fields, function (data, key) {
                        if (data.locked)
                            _qApps[appName].instance.field(key).unlock();
                    });
                }
                // clear all
                _qApps[appName].instance.clearAll();
            }
        }
    }
});
