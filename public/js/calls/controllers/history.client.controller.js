'use strict';

angular.module('calls').controller('HistoryController', ['$scope', 'Auth', 'Calls',
  function($scope, Auth, Calls){
    var user;
    $scope.calls = [];

    Auth.get().then(function(u){
      user = u;
    });

    $scope.list = function() {
      Calls.history();
    };
  }]);