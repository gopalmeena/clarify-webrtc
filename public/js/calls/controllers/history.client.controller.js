'use strict';

angular.module('calls').controller('HistoryController', ['$scope', 'Auth', 'Calls', 'Socket',
  function ($scope, Auth, Calls, Socket) {
    var user;

    $scope.calls = {};

    Auth.get().then(function (u) {
      user = u;
    });

    Calls.history().success(function (result) {
      var calls = _.filter(result.calls, function(call) {
        return call.records.length > 0;
      });

      calls.forEach(function(call){
        $scope.calls[call._id] = call;
      });
    });

    Socket.on('call.accepted', function(call){
      $scope.calls[call._id] = call;
    });

    Socket.on('call.indexed', function(call){
      $scope.calls[call._id] = call;
    });

    $scope.duration = function(call) {
      var maxDuration = 0;
      for (var i in call.records) {
        var record = call.records[i];
        if (record.clarify === undefined) return -1;
        if (record.clarify.duration === undefined) return -1;
        if (record.clarify.duration > maxDuration) {
          maxDuration = record.clarify.duration;
        }
      }
      return maxDuration;
    };

    $scope.cost = function(call) {
      var cost = 0;
      for (var i in call.records) {
        var record = call.records[i];
        if (record.clarify === undefined) return -1;
        if (record.clarify.processing_cost === undefined) return -1;

        cost += record.clarify.processing_cost;
      }
      return cost;
    };
  }
]);