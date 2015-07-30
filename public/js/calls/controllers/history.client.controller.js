'use strict';

angular.module('calls').controller('HistoryController', ['$scope', 'Auth', 'Calls',
    function ($scope, Auth, Calls) {
        var user;
        $scope.calls = [];

        Auth.get().then(function (u) {
            user = u;
        });

        Calls.history().success(function (result) {
            _.each(result.call, function(c){
                _.each(c.records, function(r){
                    r.url = '/uploads/'+ r._id +'.ogg';
                });
            });

            $scope.calls = result.calls;
        });
    }]);