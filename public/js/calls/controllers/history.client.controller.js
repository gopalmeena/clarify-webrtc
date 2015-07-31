'use strict';

angular.module('calls').controller('HistoryController', ['$scope', 'Auth', 'Calls',
    function ($scope, Auth, Calls) {
        var user;
        $scope.calls = [];

        Auth.get().then(function (u) {
            user = u;
        });

        Calls.history().success(function (result) {
            $scope.calls = _.filter(result.calls, function(c){
                return c.records.length>0;
            });
        });
    }]);